var express = require("express");

var {mongoose} = require("./db-config/mongoose_cfg.js");
var {arduinoData} = require("./models/arduinoData.js");

var app = express();

app.get("/arduinoData/:machineNum" , (req , res) => {
    var query = {machineNum: req.params.machineNum};
    arduinoData.find(query).then((arduinoData) => {
        if(!arduinoData) {
            return res.status(404).send();
        }
        else {
            res.send({arduinoData});
        }
    }).catch((e) => {
        res.status(400).send();
    });
});

app.listen(3000, () => {
  console.log('Started on port 3000');
});
