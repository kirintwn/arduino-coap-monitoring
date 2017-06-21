const bodyParser = require("body-parser");
const coap = require("coap");
const bl = require("bl");
//const querystring = require("querystring");
var server = coap.createServer();

var {mongoose} = require("./database/mongooseConfig.js");
var {arduinoData} = require("./models/arduinoData.js");
var {updateData} = require("./updateData.js");
var {app} = require("./webAPI.js");

var currentCommand = "same";

server.on("request" , (req , res) => {
    if (req.headers["Accept"] != "application/json") {
        res.code = "4.06";
        return res.end();
    }
    res.setOption("Content-Format" , "application/json");
    /*  request format reference
        coap://example.com/0/
        var arduinoData = {
            sensorData: {
                temperature: 32
            },
            LEDstate: 1
        }
    */
    var machineNum = req.url.split('/')[1];
    req.pipe(bl(function(err, data) {
        var arduinoJSON = JSON.parse(data);

        var LEDstate = arduinoJSON.LEDstate;
        var temperature = arduinoJSON.sensorData.temperature;
        var now = new Date().toString();

        console.log("Updating Data...");
        updateData(machineNum , LEDstate , temperature , now);
    }))

    var payload = {
        LEDswitch: currentCommand
    };

    currentCommand = "same"; //reset command

    res.end(JSON.stringify(payload));
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
