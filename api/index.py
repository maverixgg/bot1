import sys
import os

# Add the backend directory to the Python path
backend_path = os.path.join(os.path.dirname(os.path.dirname(__file__)), 'backend')
sys.path.insert(0, backend_path)

try:
    from main import app
    from mangum import Mangum
    
    # Wrap FastAPI app with Mangum for Vercel
    handler = Mangum(app, lifespan="off")
    
except Exception as e:
    # Fallback error handler
    def handler(event, context):
        return {
            'statusCode': 500,
            'body': f'Error loading app: {str(e)}'
        }
