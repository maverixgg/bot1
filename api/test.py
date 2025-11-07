import sys
import os

def handler(event, context):
    """Simple test handler"""
    return {
        'statusCode': 200,
        'headers': {
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*'
        },
        'body': '{"message": "API is working!", "python_version": "' + sys.version + '", "cwd": "' + os.getcwd() + '", "files": ' + str(os.listdir('.')) + '}'
    }
