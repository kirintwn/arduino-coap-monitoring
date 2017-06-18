var {mongoose} = require("./database/mongooseConfig.js");
var {arduinoData} = require("./models/arduinoData.js");

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

module.exports = {updateData};
