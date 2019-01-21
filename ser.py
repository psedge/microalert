import serial
import requests
import json
import random

def getCoords():
    return [str(random.uniform(-25, 20)), str(random.uniform(120, 145))]

coords = {
    'a': [str(random.uniform(-25, 20)), str(random.uniform(130, 135))],
    'b': [str(random.uniform(-25, 20)), str(random.uniform(130, 135))],
    'c': [str(random.uniform(-25, 20)), str(random.uniform(130, 135))],
    'd': [str(random.uniform(-25, 20)), str(random.uniform(130, 135))],
}

while True:
    try:
        ser = serial.Serial("/dev/ttyACM0", 115200, timeout=2)
        ser.flushInput()
        ser.flushOutput()
        
        data = ser.readline()
        if data is not b'':
            data = data.decode("UTF-8")
            print(data)
            id = data[0]
            message = data[3]
            
            body = json.dumps({
                'type': message, 
                'lat': getCoords()[0], 
                'long': getCoords()[1], 
                'time': 154345345235,
                'origin': id,
                'temp': data[4:]
            })

            res = requests.post("https://m9po41o830.execute-api.eu-west-1.amazonaws.com/dev/event", data=body)
            print(res)
    except Exception as e:
        print(str(e))

    pass
