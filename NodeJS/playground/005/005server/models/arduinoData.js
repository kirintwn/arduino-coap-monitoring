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
        type: String,
        required: true,
        minlength: 1
    },
    timeUpdate: {
        type: String,
        required: true,
        minlength: 1
    }
});

module.exports = {arduinoData};
