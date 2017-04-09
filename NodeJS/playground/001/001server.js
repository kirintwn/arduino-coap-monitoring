var coap = require("coap");
var server = coap.createServer();

var randomIntInc = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var LEDswitch = 0;

var turnOnLED = (callback) => {
    LEDswitch = 1;
    callback("ok");
}

var turnOffLED = (callback) => {
    LEDswitch = 0;
    callback("ok");
}



server.on("request", (req, res) => {
    //console.log(req.headers);

    var command = req.url.split('/')[1];
    console.log("command:" , command);

    if (req.headers["Accept"] != "application/json") {
        res.code = "4.06";
        return res.end();
    }

    res.setOption("Content-Format" , "application/json");

    if(command == "get") {
        var now = new Date().toString();
        var temperature = randomIntInc(5 , 40);
        //var LEDstate = randomIntInc(0,1);

        var payload = {
            timestamp: now,
            temperature: temperature,
            LEDstate: LEDswitch
        };

        res.end(JSON.stringify(payload));
    }
    else if(command == "on") {
        turnOnLED((result) => {
            var now = new Date().toString();

            var payload = {
                timestamp: now,
                LEDstate: LEDswitch,
                result: result
            };

            res.end(JSON.stringify(payload));
        });
    }
    else if(command == "off") {
        turnOffLED((result) => {
            var now = new Date().toString();

            var payload = {
                timestamp: now,
                LEDstate: LEDswitch,
                result: result
            };

            res.end(JSON.stringify(payload));
        });
    }
});

server.listen( () => {
    console.log("server started");
});
