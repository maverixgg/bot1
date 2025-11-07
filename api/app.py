"""
Minimal FastAPI app for Vercel - with error handling
"""
import logging
import os
import sys

# Configure logging first
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

try:
    from fastapi import FastAPI, HTTPException
    from fastapi.middleware.cors import CORSMiddleware
    from pydantic import BaseModel
    from typing import List
    from datetime import datetime, timezone
    from pymongo.mongo_client import MongoClient
    from pymongo.server_api import ServerApi
    from mangum import Mangum
    
    logger.info("All imports successful!")
    
    # MongoDB connection string
    MONGODB_URI = "mongodb+srv://simpleDBUser:kHTGxYO3n9W0xkRf@cluster0.ybmclvy.mongodb.net/?appName=Cluster0"
    
    # Global variables
    _client = None
    _collection = None
    
    def get_mongo_client():
        """Get or create MongoDB client"""
        global _client, _collection
        
        if _client is None:
            try:
                logger.info("Connecting to MongoDB...")
                _client = MongoClient(
                    MONGODB_URI, 
                    server_api=ServerApi('1'),
                    serverSelectionTimeoutMS=5000
                )
                _client.admin.command('ping')
                logger.info("MongoDB connected!")
                db = _client.get_database('nexaur_ai')
                _collection = db.get_collection('properties')
            except Exception as e:
                logger.error(f"MongoDB error: {str(e)}")
                raise HTTPException(status_code=500, detail=f"DB error: {str(e)}")
        
        return _collection
    
    # Pydantic models
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
    
    # Create FastAPI app
    app = FastAPI(title="Nexaur API")
    
    # CORS
    app.add_middleware(
        CORSMiddleware,
        allow_origins=["*"],
        allow_credentials=False,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    
    # Routes
    @app.get("/")
    async def root():
        return {"message": "Nexaur API", "status": "running"}
    
    @app.get("/health")
    async def health():
        return {"status": "healthy", "message": "API is working"}
    
    @app.get("/properties")
    async def get_properties():
        try:
            logger.info("Getting properties...")
            collection = get_mongo_client()
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
            logger.error(f"Error: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
    
    @app.post("/host")
    async def host_property(form: HostForm):
        try:
            collection = get_mongo_client()
            data = form.model_dump()
            data["created_at"] = datetime.now(timezone.utc)
            data["status"] = "active"
            
            result = collection.insert_one(data)
            return {
                "success": True,
                "property_id": str(result.inserted_id)
            }
        except Exception as e:
            logger.error(f"Error: {str(e)}")
            raise HTTPException(status_code=500, detail=str(e))
    
    # Wrap with Mangum
    handler = Mangum(app, lifespan="off")
    logger.info("Handler created successfully!")
    
except Exception as e:
    logger.error(f"FATAL ERROR during import: {str(e)}")
    import traceback
    logger.error(traceback.format_exc())
    
    # Create error handler
    def handler(event, context):
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': f'{{"error": "Import failed", "details": "{str(e)}"}}'
        }
