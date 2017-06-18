const coap = require("coap");
const bl = require("bl");

///////////////////////////////////////
var LED = 0;
var temperature = 25.0;

var randomIntInc = (low, high) => {
    return Math.floor(Math.random() * (high - low + 1) + low);
}

var LEDmonitor = () => {
    if(temperature >= 33) {
        console.log("temperature too high!");
        LED = 1;
    }
    else {
        LED = 0;
    }
}

var senseTemp = () => {
   temperature += randomIntInc(-3 , +4);
}
///////////////////////////////////////
var sendData = () => {
    console.log("Sending Data to CoAP Server");

    var req = coap.request({
        //host: "192.168.0.11",
        pathname: `/0/LEDstate=${LED}&temperature=${temperature}`,
        options: {
            "Accept": "application/json"
        }
    });

    req.on("response" , (res) => {
        if (res.code !== "2.05") {
            console.log("bad res!");
            //return process.exit(1);
        }
        res.pipe(bl(function(err, data) {
            var payload = JSON.parse(data);
            console.log("response: " , payload);
            LEDchanger(payload);
        }))
    });
    req.end();


}
///////////////////////////////////////
var LEDchanger = (payload) => {
    if(payload.LEDswitch == "on") {
        LED = 1;
        console.log("LED turned ON");
    }
    else if(payload.LEDswitch == "off") {
        LED = 0;
        console.log("LED turned OFF");
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
}

setInterval(senseTemp, 1*1000);   //mock temperature sensor , sense temperature every 1 sec
setInterval(LEDmonitor, 10*1000); //LED turns 1 when temperature >= 33 , sense every 1 sec
setInterval(sendData, 1*1000);  //send temperature data every 5sec through HTTP request , change LED according to response
setInterval(printState, 1*1000);  //print LED and temperature status on screen
