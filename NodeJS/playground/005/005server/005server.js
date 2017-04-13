var querystring = require("querystring");
var coap = require("coap");
var server = coap.createServer();
var stdin = process.openStdin();

var {mongoose} = require("./db-config/mongoose_cfg.js");
var {arduinoData} = require("./models/arduinoData.js");
var {app} = require("./express.js");

var command = "same";

var updateData = (machineNum , LEDstate , temperature , now) => {
    var query = {machineNum: machineNum};
    var update = {
        machineNum: machineNum,
        sensorData: {
            temperature: temperature
        },
        LEDstate: LEDstate,
        timeUpdate: now
    };
    var options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    };

    arduinoData.findOneAndUpdate(query , update , options , (error , result) => {
        if(error) return;
        console.log("data updated:");
        console.log(JSON.stringify(result , undefined , 2));
    });
}

server.on("request", (req, res) => {
    if (req.headers["Accept"] != "application/json") {
        res.code = "4.06";
        return res.end();
    }
    res.setOption("Content-Format" , "application/json");
    // coap://example.com/0/LEDstate=off&temperature=$25
    var query = req.url.split('/')[2];
    var parsedstring = querystring.parse(query);

    console.log("updating data");

    var machineNum = req.url.split('/')[1];
    var LEDstate = parsedstring.LEDstate;
    var temperature = parsedstring.temperature;
    var now = new Date().toString();
    updateData(machineNum , LEDstate , temperature , now);

    var payload = {
        LEDchange: command
    };

    command = "same";  //reset command

    res.end(JSON.stringify(payload));
});

server.listen( () => {
    console.log("server started");
});

app.get("/LEDchange/:LEDstate" , (req , res) => {
    console.log("HTTP REQUEST TO CHANGE LED TO:" , req.params.LEDstate);
    command = req.params.LEDstate;

    res.send(`LED turned ${req.params.LEDstate}`);
});
//stdin.addListener("data", (d) => command = d.toString().trim());
