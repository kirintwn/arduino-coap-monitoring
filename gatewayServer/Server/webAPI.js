var ObjectID = require('mongodb').ObjectID;
const express = require("express");
const config = require("config-lite")(__dirname);
const cors = require("cors");

const {mongoose} = require("./database/mongooseConfig.js");
const {arduinoData} = require("./models/arduinoData.js");

var app = express();


app.use(cors());

app.get("/arduinoData/:machineNum" , (req , res) => {
    arduinoData.find({'machineNum': req.params.machineNum}).sort('-timeUpdate').limit(20).exec(function(err, data){
        if(err) {
            return res.status(400).send();
        }
        else if(!data) {
            return res.status(404).send();
        }
        else {
            res.send({data});
        }

    });
});

app.get("/temperature/lowest/:machineNum" , (req , res) => {
    arduinoData.find({'machineNum': req.params.machineNum}).sort('sensorData.temperature').limit(1).exec(function(err, data){
        if(err) {
            return res.status(400).send();
        }
        else if(!data) {
            return res.status(404).send();
        }
        else {
            res.send({data});
        }
    });
});

app.get("/temperature/highest/:machineNum" , (req , res) => {
    arduinoData.find({'machineNum': req.params.machineNum}).sort('-sensorData.temperature').limit(1).exec(function(err, data){
        if(err) {
            return res.status(400).send();
        }
        else if(!data) {
            return res.status(404).send();
        }
        else {
            res.send({data});
        }
    });
});

app.get("/temperature/lowestHours/:hours/:machineNum" , (req , res) => {
    var timestamp = new Date(Date.now() - req.params.hours * 60 * 60 * 1000);
    var hexSeconds = Math.floor(timestamp/1000).toString(16);
    var constructedObjectId = ObjectID(hexSeconds + "0000000000000000");

    arduinoData
    .find({
        'machineNum': req.params.machineNum ,
        "_id": {
            "$gt" : constructedObjectId
        }
    })
    .sort('sensorData.temperature').limit(1).exec(function(err, data){
        if(err) {
            return res.status(400).send();
        }
        else if(!data) {
            return res.status(404).send();
        }
        else {
            res.send({data});
        }
    });
});

app.get("/temperature/highestHours/:hours/:machineNum" , (req , res) => {
    var timestamp = new Date(Date.now() - req.params.hours * 60 * 60 * 1000);
    var hexSeconds = Math.floor(timestamp/1000).toString(16);
    var constructedObjectId = ObjectID(hexSeconds + "0000000000000000");

    arduinoData
    .find({
        'machineNum': req.params.machineNum ,
        "_id": {
            "$gt" : constructedObjectId
        }
    })
    .sort('-sensorData.temperature').limit(1).exec(function(err, data){
        if(err) {
            return res.status(400).send();
        }
        else if(!data) {
            return res.status(404).send();
        }
        else {
            res.send({data});
        }
    });
});

app.listen(config.apiPort , () => {
    console.log("Start WEB API Server on port: " , config.apiPort);
});

module.exports = {app};
