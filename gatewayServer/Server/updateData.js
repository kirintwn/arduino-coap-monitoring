var {mongoose} = require("./database/mongooseConfig.js");
var {arduinoData} = require("./models/arduinoData.js");

var updateData = (machineNum , LEDstate , temperature , now) => {
    var newArduinoData = new arduinoData({
        machineNum: machineNum,
        sensorData: {
            temperature: temperature
        },
        LEDstate: LEDstate,
        timeUpdate: now
    });

    newArduinoData.save().then((doc) => {
        console.log("data updated");
    } , (e) => {
        console.log("save error");
    });
}

module.exports = {updateData};
