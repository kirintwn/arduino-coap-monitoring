const express = require("express");
const config = require("config-lite")(__dirname);

const {mongoose} = require("./database/mongooseConfig.js");
const {arduinoData} = require("./models/arduinoData.js");

var app = express();

app.get("/arduinoData/:machineNum" , (req , res) => {
    var queryNum = {machineNum: req.params.machineNum};

    arduinoData.findOne(queryNum).then((arduinoData) => {
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

app.listen(config.apiPort , () => {
    console.log("Start WEB API Server on port: " , config.apiPort);
})

module.exports = {app};
