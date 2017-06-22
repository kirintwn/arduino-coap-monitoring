const bodyParser = require("body-parser");
const coap = require("coap");
const bl = require("bl");

var server = coap.createServer();

var {mongoose} = require("./database/mongooseConfig.js");
var {arduinoData} = require("./models/arduinoData.js");
var {updateData} = require("./updateData.js");
var {app} = require("./webAPI.js");

var currentCommand = "AAAAAA";

server.on("request" , (req , res) => {
    if (req.headers["Accept"] != "application/json" ||
    req.headers["Content-Format"] != "application/json" ||
    req.method != "PUT") {
        res.code = "4.06";
        return res.end();
    }
    res.setOption("Content-Format" , "application/json");
    res.code = "2.04";
    /*  request format reference
        coap://example.com/0/
        requestPayload = {
            sensorData: {
                temperature: 32
            },
            LEDstate: 1
        }
    */
    var machineNum = req.url.split('/')[1];
    req.pipe(bl(function(err, data) {
        var requestPayload = JSON.parse(data);

        if(isNaN(requestPayload.LEDstate) || isNaN(requestPayload.sensorData.temperature)) {
            res.code = "4.05";
            return res.end();
        }

        var LEDstate = requestPayload.LEDstate;
        var temperature = requestPayload.sensorData.temperature;
        var now = new Date().toString();

        console.log("Updating Data...");
        updateData(machineNum , LEDstate , temperature , now);
    }))

    var responsePayload = {
        LED: currentCommand
    };

    res.end(JSON.stringify(responsePayload));
});

server.listen(() => {
    console.log("CoAP server started");
});

app.use(bodyParser.json());

app.put("/LED" , (req , res) => {
    var LEDstate = req.body.LEDstate;
    console.log(req.body.LEDstate);
    console.log("REQUEST TO CHANGE LED TO" , LEDstate);
    if(LEDstate == "AAAAAA" || LEDstate == "YYYYYY" || LEDstate == "NNNNNN") {
        currentCommand = LEDstate;
        if(LEDstate == "AAAAAA") {
            res.send("AUTO");
        }
        else if(LEDstate == "YYYYYY") {
            res.send("ON");
        }
        else if(LEDstate == "NNNNNN") {
            res.send("OFF");
        }
    }
    else {
        res.status(400).send();
    }
});
