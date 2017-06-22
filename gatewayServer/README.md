# IOT Project Gateway Server
###### tags: `Node.js` `IOT` `CoAP` `MongoDB`

## Implementation
- Node.js 7.8.0
- dependencies:
    - express 4.15.3
    - mongoose 4.10.6
    - coap 0.21.0
    - body-parser 1.17.2
    - bl 1.2.1
    - config-lite 2.0.0

## Description
A simple gateway server that hosts a server for IOT devices sending data by CoAP protocol.
It also provides HTTP API for mobile application to get the data from the IOT device.

## Installation
- clone the repository
- install Node.js v7.8.0 (or later version)
- run`npm install`
- modify the mongoDB dbpath at `config/default.js`

## Usage
- run the server `node Server/server.js`
- run the mockup client (IOT device) `node clientMockup.js`
- go to `http://localhost:3000/arduinoData/0` to see HTTP API
    - screenshot with JSONView add-on
    ![](https://i.imgur.com/3VNDkZP.png)
- to change LED state with HTTP API
    - url: `http://localhost:3000/LED`
    - method: `PUT`
    - body: `{"LEDstate": "off/on"}` in JSON format
    - response is `LED turned off/on`
    - Postman screenshot ![](https://i.imgur.com/Jb7M2F4.png)

## Communication Between Client and Server
- Client sends CoAP request
    - url: `coap://localhost/0/`
        - The pathname `/0/` means Machine No.0
    - header:
        - `"Accept": "application/json"`
        - `"Content-Format": "application/json"`
    - method: `POST`
    - payload: A JSON object `requestPayload` consisted of
        - `sensorData`
            - int `temperature`
        - int `LEDstate`(only 0 or 1)

- Server reads the request, sending back response
    - header: `"Content-Format" , "application/json"`
    - payload: A JSON object `responsePayload` consisted of
        - string `LEDswitch` (on , off , same)

- Client reacts according to `LEDswitch`
    - `on` -> turning on LED
    - `off` -> turning off LED
    - `same` -> don't change LED

## License
MIT © Kirintw
