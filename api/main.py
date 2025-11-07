from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List
from datetime import datetime, timezone
import logging
import os
from google import genai
from google.genai import types
from pymongo.mongo_client import MongoClient
from pymongo.server_api import ServerApi
from mangum import Mangum

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# MongoDB connection string
MONGODB_URI = "mongodb+srv://simpleDBUser:kHTGxYO3n9W0xkRf@cluster0.ybmclvy.mongodb.net/?appName=Cluster0"

# Global variables
client = None
nexaur_db = None
prop_collection = None
gemini_client = None
generation_config = None

def get_mongo_client():
    """Get or create MongoDB client"""
    global client, nexaur_db, prop_collection
    
    if client is None:
        try:
            logger.info(f"Connecting to MongoDB...")
            client = MongoClient(
                MONGODB_URI, 
                server_api=ServerApi('1'),
                serverSelectionTimeoutMS=5000
            )
            client.admin.command('ping')
            logger.info("Successfully connected to MongoDB!")
            nexaur_db = client.get_database('nexaur_ai')
            prop_collection = nexaur_db.get_collection('properties')
            logger.info("Database and collection initialized")
        except Exception as e:
            logger.error(f"MongoDB connection error: {str(e)}")
            raise HTTPException(status_code=500, detail=f"Database connection failed: {str(e)}")
    
    return prop_collection

def get_gemini_client():
    """Get or create Gemini client"""
    global gemini_client, generation_config
    
    if gemini_client is None:
        try:
            logger.info("Initializing Gemini API...")
            api_key = os.getenv("GEMINI_API_KEY")
            
            if not api_key:
                logger.error("GEMINI_API_KEY not found in environment variables")
                return None, None
            
            gemini_client = genai.Client(api_key=api_key)
            
            google_search_tool = types.Tool(
                google_search=types.GoogleSearch()
            )
            
            generation_config = types.GenerateContentConfig(
                tools=[google_search_tool],
                temperature=0.7,
                top_p=0.9,
                max_output_tokens=1200,
            )
            
            logger.info("Gemini API initialized successfully!")
        except Exception as e:
            logger.error(f"Error initializing Gemini: {str(e)}")
            return None, None
    
    return gemini_client, generation_config

# Create FastAPI app
app = FastAPI(title="Nexaur Real Estate API")

# CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Pydantic models
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

# Routes
@app.get("/")
async def root():
    return {"message": "Nexaur Real Estate API", "status": "running"}

@app.get("/health")
async def health_check():
    try:
        client_obj, config = get_gemini_client()
        return {
            "status": "healthy",
            "model_loaded": client_obj is not None,
            "model": "Gemini 2.5 Flash"
        }
    except Exception as e:
        return {
            "status": "healthy",
            "model_loaded": False,
            "error": str(e)
        }

@app.get("/properties")
async def allprops():
    try:
        logger.info("Fetching properties from MongoDB...")
        collection = get_mongo_client()
        logger.info("MongoDB client obtained successfully")
        
        properties = list(collection.find({}))
        logger.info(f"Found {len(properties)} properties")
        
        for prop in properties:
            prop["_id"] = str(prop["_id"])
        
        return {
            "success": True,
            "count": len(properties),
            "properties": properties
        }
    except Exception as e:
        logger.error(f"Error fetching properties: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

@app.post("/chat", response_model=ChatResponse)
async def chat(request: ChatRequest):
    client_obj, config = get_gemini_client()
    if client_obj is None or config is None:
        raise HTTPException(status_code=503, detail="Gemini API not initialized")
    
    try:
        collection = get_mongo_client()
        properties = list(collection.find({}))
        
        properties_context = ""
        if properties:
            properties_context = "\n\nAvailable Properties:\n"
            for idx, prop in enumerate(properties, 1):
                properties_context += f"""
                {idx}. {prop.get('propertyName', 'N/A')}
                - Company: {prop.get('companyName', 'N/A')}
                - Location: {prop.get('location', 'N/A')}
                - Type: {prop.get('projectType', 'N/A')}
                - Status: {prop.get('presentStatus', 'N/A')}
                """
        
        system_prompt = f"""You are Nexaur AI - a friendly financial advisor for Bangladeshi real estate investors.
        
        {properties_context}
        
        Help users understand fractional real estate investing using simple language."""
        
        contents = [system_prompt]
        for msg in request.messages:
            contents.append(msg.content)
        
        response = client_obj.models.generate_content(
            model='gemini-2.0-flash-exp',
            contents=contents,
            config=config
        )
        
        return ChatResponse(response=response.text)
        
    except Exception as e:
        logger.error(f"Chat error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/host")
async def host_property(hostform: HostForm):
    try:
        collection = get_mongo_client()
        property_data = hostform.model_dump()
        property_data["created_at"] = datetime.now(timezone.utc)
        property_data["updated_at"] = datetime.now(timezone.utc)
        property_data["status"] = "active"
        
        result = collection.insert_one(property_data)
        logger.info(f"Property inserted with ID: {result.inserted_id}")
        
        return {
            "success": True,
            "message": "Property added successfully",
            "property_id": str(result.inserted_id)
        }
    except Exception as e:
        logger.error(f"Error inserting property: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

# Wrap with Mangum for Vercel
handler = Mangum(app, lifespan="off")
