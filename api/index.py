from mangum import Mangum
import sys
import os

# Add the backend directory to the Python path
sys.path.insert(0, os.path.join(os.path.dirname(__file__), '..', 'backend'))

from main import app

# Wrap FastAPI app with Mangum for Vercel
handler = Mangum(app)
