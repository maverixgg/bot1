"""
Direct MongoDB connection without FastAPI
"""
import json
import os

def handler(event, context):
    """Direct handler for properties endpoint"""
    try:
        # Import here to catch errors
        from pymongo.mongo_client import MongoClient
        from pymongo.server_api import ServerApi
        
        # MongoDB connection
        MONGODB_URI = "mongodb+srv://simpleDBUser:kHTGxYO3n9W0xkRf@cluster0.ybmclvy.mongodb.net/?appName=Cluster0"
        
        # Connect to MongoDB
        client = MongoClient(
            MONGODB_URI, 
            server_api=ServerApi('1'),
            serverSelectionTimeoutMS=5000
        )
        
        # Get database and collection
        db = client.get_database('nexaur_ai')
        collection = db.get_collection('properties')
        
        # Fetch properties
        properties = list(collection.find({}))
        
        # Convert ObjectId to string
        for prop in properties:
            prop["_id"] = str(prop["_id"])
        
        # Return response
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, OPTIONS',
                'Access-Control-Allow-Headers': '*'
            },
            'body': json.dumps({
                "success": True,
                "count": len(properties),
                "properties": properties
            })
        }
        
    except Exception as e:
        import traceback
        error_details = {
            'error': str(e),
            'traceback': traceback.format_exc(),
            'type': type(e).__name__
        }
        
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(error_details)
        }
