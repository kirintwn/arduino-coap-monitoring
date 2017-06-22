const bodyParser = require("body-parser");
const coap = require("coap");
const bl = require("bl");

var server = coap.createServer();

var {mongoose} = require("./database/mongooseConfig.js");
var {arduinoData} = require("./models/arduinoData.js");
var {updateData} = require("./updateData.js");
var {app} = require("./webAPI.js");

var currentCommand = "same";

server.on("request" , (req , res) => {
    if (req.headers["Accept"] != "application/json" ||
    req.headers["Content-Format"] != "application/json" ||
    req.method != "POST") {
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

        var LEDstate = requestPayload.LEDstate;
        var temperature = requestPayload.sensorData.temperature;
        var now = new Date().toString();

        console.log("Updating Data...");
        updateData(machineNum , LEDstate , temperature , now);
    }))

    var responsePayload = {
        LEDswitch: currentCommand
    };

    currentCommand = "same"; //reset command

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

    currentCommand = LEDstate;

    res.send(`LED turned ${currentCommand}`);
});
