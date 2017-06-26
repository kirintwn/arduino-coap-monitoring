var mongoose = require("mongoose");

var arduinoData = mongoose.model("arduinoData" , {
    machineNum: {
        type: Number,
        required: true
    },
    sensorData: {
        temperature: {
            type: Number,
            required: true
        }
    },
    LEDstate: {
        type: Number,
        required: true,
    },
    timeUpdate: {
        type: Date,
        default: Date.now
    }
});

module.exports = {arduinoData};
