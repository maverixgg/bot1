"""
Simple health check endpoint
"""
import json

def handler(event, context):
    """Health check handler"""
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': json.dumps({
            'status': 'healthy',
            'message': 'API is working',
            'service': 'Nexaur Properties API'
        })
    }
