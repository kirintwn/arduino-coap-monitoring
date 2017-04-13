var mongoose = require("mongoose");

var sensorData = mongoose.model("sensorData" , {
    sensorName: {
        type: String,
        required: true,
        minlength: 1
    },
    tempUpdate: {
        type: Number,
        required: true
    },
    timeUpdate: {
        type: String,
        required: true,
        minlength: 1
    }
});

module.exports = {sensorData};
