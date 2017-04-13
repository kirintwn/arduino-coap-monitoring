var express = require("express");

var {mongoose} = require("./db-config/mongoose_cfg.js");
var {sensorData} = require("./models/sensorData.js");

var app = express();

app.get("/sensorData/tempSensor" , (req , res) => {
    var query = {sensorName: "tempSensor"};
    sensorData.find(query).then((sensorData) => {
        if(!sensorData) {
            return res.status(404).send();
        }
        else {
            res.send({sensorData});
        }
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
