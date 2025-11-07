from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from contextlib import asynccontextmanager
from datetime import datetime, timezone
import logging
import os
from dotenv import load_dotenv
from google import genai
from google.genai import types
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi

uri = "mongodb+srv://simpleDBUser:kHTGxYO3n9W0xkRf@cluster0.ybmclvy.mongodb.net/?appName=Cluster0"

# Create a new client and connect to the server
client = MongoClient(uri, server_api=ServerApi('1'))

# Send a ping to confirm a successful connection
try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
    nexaur_db = client.get_database('nexaur_ai')
    prop_collection = nexaur_db.get_collection('properties')
    
except Exception as e:
    print(e)

# Load environment variables
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Global variables for Gemini client and config
gemini_client = None
generation_config = None

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Initialize on startup, cleanup on shutdown"""
    global gemini_client, generation_config
    
    # Startup
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
    
    yield  # Server runs here
    
    # Shutdown (cleanup if needed)
    logger.info("Shutting down...")

app = FastAPI(title="Finance Real Estate Chatbot API", lifespan=lifespan)

# CORS middleware - Allow all origins for Vercel deployment
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins
    allow_credentials=False,  # Must be False when allow_origins is "*"
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    role: str
    content: str

class ChatRequest(BaseModel):
    messages: List[Message]
    max_length: int = 512

class ChatResponse(BaseModel):
    response: str

class HostForm(BaseModel):
    companyName: str
    propertyName: str
    location: str
    photoUrl: str
    projectType: str
    totalApartments: float
    apartmentSize: float
    presentStatus: str
    numFloors: float
    landSize: float


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


@app.get("/properties")
async def allprops():
    try:
        # Find all properties and convert cursor to list
        properties = list(prop_collection.find({}))
        
        # Convert ObjectId to string for JSON serialization
        for prop in properties:
            prop["_id"] = str(prop["_id"])
        
        return {
            "success": True,
            "count": len(properties),
            "properties": properties
        }
    except Exception as e:
        logger.error(f"Error fetching properties: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error fetching properties: {str(e)}")


@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    """Handle chat requests with property database context"""
    if gemini_client is None or generation_config is None:
        raise HTTPException(status_code=503, detail="Model not initialized yet")
    
    try:
        # Fetch all properties from database to provide context
        properties = list(prop_collection.find({}))
        
        # Format properties for AI context
        properties_context = ""
        if properties:
            properties_context = "\n\nAvailable Properties in Database:\n"
            for idx, prop in enumerate(properties, 1):
                properties_context += f"""
                {idx}. {prop.get('propertyName', 'N/A')}
                - Company: {prop.get('companyName', 'N/A')}
                - Location: {prop.get('location', 'N/A')}
                - Type: {prop.get('projectType', 'N/A')}
                - Status: {prop.get('presentStatus', 'N/A')}
                - Total Apartments: {prop.get('totalApartments', 'N/A')}
                - Apartment Size: {prop.get('apartmentSize', 'N/A')} sq ft
                - Floors: {prop.get('numFloors', 'N/A')}
                - Land Size: {prop.get('landSize', 'N/A')} katha
                - Photo: {prop.get('photoUrl', 'N/A')}
                """
        else:
            properties_context = "\n\nNo properties currently available in the database."
        
        # Build the conversation context with system prompt
        system_prompt = f"""You are Nexaur AI — a calm, trustworthy, and friendly financial advisor for Bangladeshi investors, especially men in their 30s or older.
        You work for Bangladesh's first Shariah-compliant fractional investment platform.

        Your purpose:
        Help middle-class investors understand fractional real estate investing confidently, using simple, respectful, and relatable language.

        **IMPORTANT: You have access to real property data from our platform. When users ask about properties, locations, or specific projects, refer to the data below.**

        {properties_context}

        Tone and Style:
        - Speak naturally, as if talking to a friend or elder brother (“bhai”).
        - Always sound respectful, warm, and trustworthy.
        - Use clear and simple Bangladeshi examples (areas, taka, rent, FDR, etc.)
        - Avoid complex jargon unless explained.
        - Be honest: mention both pros and cons calmly.
        - Never sound pushy, corporate, or robotic.

        When discussing properties:
        - Reference specific properties by name and location from the database above
        - Provide accurate details (size, floors, status, etc.)
        - If asked about locations, list properties available in that area
        - If no properties match the query, politely inform the user and suggest alternatives
        - Always mention users can check the Properties page for full details and photos

        Example:
        User: "What properties do you have in Gulshan?"
        Assistant: "Let me check our current listings, bhai. We have [list properties in Gulshan with key details]. Each of these offers fractional ownership, meaning you can invest with a smaller amount and still earn rental income. Would you like more details about any specific property?"

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
        - **Answering queries about specific properties in our database**

        Guidelines:
        1. Always check the property database context first when answering property-related questions
        2. Be honest, data-driven, and empathetic.
        3. Keep answers under 500 words unless deep analysis is requested.
        4. Use bullet points or short paragraphs for readability.
        5. Use Google Search only for general market data, NOT for our internal properties.
        6. Never discuss or recommend haram instruments (like riba-based loans).

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
        
        logger.info(f"Response generated successfully (using {len(properties)} properties as context)")
        
        return ChatResponse(response=response_text.strip())
    
    except Exception as e:
        logger.error(f"Error generating response: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error generating response: {str(e)}")

@app.post("/host")
async def host_property(hostform: HostForm):
    """Store property in MongoDB"""
    if prop_collection is None:
        raise HTTPException(status_code=503, detail="Database not initialized")
    
    try:
        # Convert Pydantic model to dict
        property_data = hostform.model_dump()
        
        # Add metadata with timezone-aware datetime
        property_data["created_at"] = datetime.now(timezone.utc)
        property_data["updated_at"] = datetime.now(timezone.utc)
        property_data["status"] = "active"
        
        # Insert into MongoDB
        result = prop_collection.insert_one(property_data)
        
        logger.info(f"Property inserted with ID: {result.inserted_id}")
        
        # Return success response
        return {
            "success": True,
            "message": "Property added successfully",
            "property_id": str(result.inserted_id),
            "data": hostform
        }
        
    except Exception as e:
        logger.error(f"Error inserting property: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error saving property: {str(e)}")


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
