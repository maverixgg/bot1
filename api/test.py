def handler(event, context):
    """Simple test handler"""
    try:
        import json
        import sys
        import os
        
        # Try importing dependencies
        try:
            import fastapi
            fastapi_version = fastapi.__version__
        except Exception as e:
            fastapi_version = f"Error: {str(e)}"
        
        try:
            import pymongo
            pymongo_version = pymongo.__version__
        except Exception as e:
            pymongo_version = f"Error: {str(e)}"
        
        try:
            from google import genai
            genai_version = "OK"
        except Exception as e:
            genai_version = f"Error: {str(e)}"
        
        try:
            import mangum
            mangum_version = mangum.__version__
        except Exception as e:
            mangum_version = f"Error: {str(e)}"
        
        result = {
            'message': 'Dependencies check',
            'python_version': sys.version,
            'fastapi': fastapi_version,
            'pymongo': pymongo_version,
            'genai': genai_version,
            'mangum': mangum_version,
            'cwd': os.getcwd(),
            'env_vars': list(os.environ.keys())
        }
        
        return {
            'statusCode': 200,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps(result)
        }
    except Exception as e:
        import traceback
        return {
            'statusCode': 500,
            'headers': {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            'body': json.dumps({
                'error': str(e),
                'traceback': traceback.format_exc()
            })
        }
