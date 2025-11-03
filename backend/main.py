from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
import logging
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types


# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="Finance Real Estate Chatbot API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Vite default port
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Global variables for Gemini client and config
gemini_client = None
generation_config = None

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    max_length: int = 512

class ChatResponse(BaseModel):
    response: str

@app.on_event("startup")
async def load_model():
    """Initialize Gemini API client and configure tools"""
    global gemini_client, generation_config
    try:
        logger.info("Initializing Gemini API with Google Search...")
        api_key = os.getenv("GEMINI_API_KEY")
        
        if not api_key:
            raise ValueError("GEMINI_API_KEY not found in environment variables")
        
        # Initialize Gemini client
        gemini_client = genai.Client(api_key=api_key)
        
        # Configure Google Search tool
        google_search_tool = types.Tool(
            google_search=types.GoogleSearch()
        )
        
        # Create generation config with tools (extensible for future tools)
        generation_config = types.GenerateContentConfig(
            tools=[google_search_tool],  # Add more tools here in the future
            temperature=0.7,
            top_p=0.9,
            max_output_tokens=1200,
        )
        
        logger.info("Gemini API with Google Search initialized successfully!")
    except Exception as e:
        logger.error(f"Error initializing Gemini: {str(e)}")
        raise

@app.get("/")
async def root():
    return {"message": "Finance Real Estate Chatbot API", "status": "running"}

@app.get("/health")
async def health_check():
    return {
        "status": "healthy",
        "model_loaded": gemini_client is not None,
        "model": "Gemini 2.5 Flash",
        "tools": ["Google Search"]
    }

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handle chat requests"""
    if gemini_client is None or generation_config is None:
        raise HTTPException(status_code=503, detail="Model not initialized yet")
    
    try:
        # Build the conversation context with system prompt
        system_prompt = """You are Nexaur AI — a calm, trustworthy, and friendly financial advisor for Bangladeshi investors, especially men in their 30s or older.
You work for Bangladesh's first Shariah-compliant fractional investment platform.

Your purpose:
Help middle-class investors understand fractional real estate investing confidently, using simple, respectful, and relatable language.

Tone and Style:
- Speak naturally, as if talking to a friend or elder brother (“bhai”).
- Always sound respectful, warm, and trustworthy.
- Use clear and simple Bangladeshi examples (areas, taka, rent, FDR, etc.)
- Avoid complex jargon unless explained.
- Be honest: mention both pros and cons calmly.
- Never sound pushy, corporate, or robotic.

Example:
User: “I don't fully understand how owning part of a flat works. Can you explain simply?”
Assistant: “Of course, bhai. Think of it this way — instead of buying an entire flat for 1 crore taka, you and a few others each buy a small portion, say 5-10 lakh taka each.
The property is managed by a trusted platform, and you receive rent and value growth based on your share.
It's a way to invest in real estate without needing huge capital, while still earning from rent and appreciation.”

Expertise:
- Real estate investment strategies in Bangladesh
- Shariah-compliant investing
- Market analysis, ROI, and risk assessment
- Helping middle-class investors build halal wealth safely

Guidelines:
1. Be honest, data-driven, and empathetic.
2. Keep answers under 500 words unless deep analysis is requested.
3. Use bullet points or short paragraphs for readability.
4. Use Google Search if you need current market data.
5. Never discuss or recommend haram instruments (like riba-based loans).

Now begin your conversation below.


"""
        
        # Build conversation history
        conversation_history = []
        for msg in request.messages:
            if msg.role == "user":
                conversation_history.append(f"User: {msg.content}")
            elif msg.role == "assistant":
                conversation_history.append(f"Assistant: {msg.content}")
        
        # Combine system prompt with conversation
        full_prompt = f"{system_prompt}\n\n" + "\n".join(conversation_history) + "\nAssistant:"
        
        # Generate response using Gemini with Google Search tool
        response = gemini_client.models.generate_content(
            model="gemini-2.5-flash",
            contents=full_prompt,
            config=generation_config
        )
        
        # Extract text from response (google-genai SDK structure)
        if hasattr(response, 'text') and response.text:
            response_text = response.text.strip()
        elif hasattr(response, 'candidates') and response.candidates:
            # Try to get text from candidates
            candidate = response.candidates[0]
            if hasattr(candidate, 'content') and hasattr(candidate.content, 'parts'):
                parts = candidate.content.parts
                response_text = ''.join([part.text for part in parts if hasattr(part, 'text')])
            else:
                response_text = str(candidate)
        else:
            # Fallback
            response_text = str(response)
        
        logger.info("Response generated successfully")
        
        return ChatResponse(response=response_text.strip())
    
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
