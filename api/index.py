# Import the handler from app.py
try:
    from app import handler
except Exception as e:
    # If import fails, create error handler
    import json
    def handler(event, context):
        return {
            'statusCode': 500,
            'headers': {'Content-Type': 'application/json'},
            'body': json.dumps({'error': f'Failed to import app: {str(e)}'})
        }
