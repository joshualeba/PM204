import urllib.request
import json
import time

url = "http://127.0.0.1:8000/v1/usuarios/"

users = [
    {"nombre": "Carlos Perez", "edad": 25},
    {"nombre": "Maria Lopez", "edad": 30},
    {"nombre": "Juan Diaz", "edad": 22}
]

time.sleep(2) # wait for server to start

for user in users:
    data = json.dumps(user).encode('utf-8')
    req = urllib.request.Request(url, data=data, headers={'Content-Type': 'application/json'}, method='POST')
    try:
        with urllib.request.urlopen(req) as response:
            print(f"Added {user['nombre']}: {response.status}")
            response_body = response.read().decode('utf-8')
            print(response_body)
    except urllib.error.HTTPError as e:
        print(f"Error adding {user['nombre']}: {e.code}")
        print(e.read().decode('utf-8'))
    except Exception as e:
        print(f"Error adding {user['nombre']}: {e}")
