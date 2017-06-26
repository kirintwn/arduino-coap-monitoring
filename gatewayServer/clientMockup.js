const coap = require("coap");
const bl = require("bl");

///////////////////////////////////////
var LED = 0;
var temperature = 24.53;

var randomIntInc = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var senseTemp = () => {
   temperature = temperature + randomIntInc(-4 , +4);
}
///////////////////////////////////////
var sendData = () => {
    console.log("Sending Data to CoAP Server");

    var req = coap.request({
        //host: "myIP",
        pathname: "/0/",
        method: "PUT",
        options: {
            "Accept": "application/json",
            "Content-Format": "application/json"
        }
    });

    var requestPayload = {
        sensorData: {
            temperature: temperature.toFixed(1)
        },
        LEDstate: LED
    }

    req.write(JSON.stringify(requestPayload));

    req.on("response" , (res) => {
        if (res.code !== "2.04") {
            console.log("bad res!");
            //return process.exit(1);
        }
        res.pipe(bl(function(err, data) {
            var responsePayload = JSON.parse(data);
            console.log("response: " , responsePayload);
            LEDchanger(responsePayload);
        }))
    });
    req.end();


}
///////////////////////////////////////
var LEDchanger = (responseBody) => {
    if(responseBody.LED == "YYYYYY") {
        LED = 1;
        console.log("LED turned ON");
    }
    else if(responseBody.LED == "NNNNNN") {
        LED = 0;
        console.log("LED turned OFF");
    }
    else if(responseBody.LED == "AAAAAA") {
        console.log("LED turned AUTO mode");

        var LEDmonitor = () => {
            if(temperature >= 32) {
                console.log("temperature too high!");
                LED = 1;
            }
            else {
                LED = 0;
            }
        }
        LEDmonitor();
    }
    else {
        console.log("LED remain same value");
    }
}

var printState = () => {
    var now = new Date().toString();
    console.log(now);
    console.log("LED: " , LED);
    console.log("temperature: " , temperature);
    console.log("");
}

setInterval(senseTemp, 1*1000);   //mock temperature sensor , sense temperature every 1 sec
setInterval(sendData, 1*1000);  //send temperature data every 5sec through HTTP request , change LED according to response
setInterval(printState, 1*1000);  //print LED and temperature status on screen
