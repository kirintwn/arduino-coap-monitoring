# Node.JS Server v5.0.0
>Implementing with with express, coap, mongoose

## How to Use
1. Config correct host and mongoDB server
2. execute the server by
```= code
node 005server/005server.js
```
3. execute the client by
```= code
node 005client.js
```
4. go to web to see if the API function properly
```
http://localhost:3000/arduinoData/0/
```
5. send HTTP request to contorl LED
```
http://localhost:3000/LEDchange/off
http://localhost:3000/LEDchange/on
```

## Screenshots
### HTTP: API
![](https://i.imgur.com/1m3mZi6.png)

### HTTP: contorl LED
![](https://i.imgur.com/9GjmJDc.png)




## Architecture
### 005client.js
- mock program (of Arudino)
    - created fake LED and temperature sensor
    - turned LED on when temperature >= 33 (every 10 second)
    - update data every 1 second

- sending arduinoData through CoAP request
    - eg: "coap://hostname/0/LEDstate=on&temperature=35}"
        - 0 -> machineNum
        - LEDstate -> "on" or "off"
        - temperature -> temperature in Integer
    - sending request every 1 second
    - changing LEDstate according to response's "payload.LEDchange"


### 005server.js
- CoAP server
    - get CoAP request
    - update arduinoData to MongoDB server
    - sending response "LEDchange" back

- handle HTTP request: "/LEDchange/:LEDstate"
    - change variable "LEDchange"

### express.js
- express HTTP server
- handle HTTP request: "/arduinoData/:machineNum"
    - get aduinoData according to machineNum
    - send aduinoData through response
        - JSON format

### db-config/mongoose_config.js
- configuration between mongoose and MongoDB

### models/arduinoData.js
- mongoose model of arduinoData
