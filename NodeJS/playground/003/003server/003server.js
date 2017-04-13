var coap = require("coap");
var server = coap.createServer();
var stdin = process.openStdin();

var {mongoose} = require("./db-config/mongoose_cfg.js");
var {sensorData} = require("./models/sensorData.js");

var command = "same";

var updateData = (sensorName , tempNow , now) => {
    var query = {sensorName: sensorName};
    var update = {
        sensorName: sensorName,
        tempUpdate: tempNow,
        timeUpdate: now
    };
    var options = {
        upsert: true,
        new: true,
        setDefaultsOnInsert: true
    };

    sensorData.findOneAndUpdate(query , update , options , (error , result) => {
        if(error) return;
        console.log("new temp data:");
        console.log(JSON.stringify(result , undefined , 2));
    });
}

stdin.addListener("data", (d) => command = d.toString().trim());

server.on("request", (req, res) => {
    var sensorName = req.url.split('/')[1];
    var tempNow = req.url.split('/')[2];
    var now = new Date().toString();

    console.log(req.headers);
    console.log(sensorName);
    console.log(now);


    if (req.headers["Accept"] != "application/json") {
        res.code = "4.06";
        return res.end();
    }

    res.setOption("Content-Format" , "application/json");

    console.log(now);
    console.log("updating tempData: " , tempNow);
    console.log(" ");

    updateData(sensorName , tempNow , now);

    var payload = {
        LEDchange: command
    };

    command = "same";  //reset command

    res.end(JSON.stringify(payload));
});

server.listen( () => {
    console.log("server started");
});
