/*
document.getElementById("recordHigh").innerHTML = "56";
document.getElementById("recordLow").innerHTML = "56";
document.getElementById("24High").innerHTML = "56";
document.getElementById("24Low").innerHTML = "56";
*/

var changeRecordHigh = () => {
    const instance = axios.create({baseURL: 'http://myIP:3030'});

    instance.get('/temperature/highest/0')
    .then((response) => {
        var tempNow = response.data.data[0].sensorData.temperature;
        document.getElementById("recordHigh").innerHTML = tempNow.toString() + "°C";
    })
    .catch((error) => {
        console.log(error);
    })
}

var changeRecordLow = () => {
    const instance = axios.create({baseURL: 'http://myIP:3030'});

    instance.get('/temperature/lowest/0')
    .then((response) => {
        var tempNow = response.data.data[0].sensorData.temperature;
        document.getElementById("recordLow").innerHTML = tempNow.toString() + "°C";
    })
    .catch((error) => {
        console.log(error);
    })
}

var change10minHigh = () => {
    const instance = axios.create({baseURL: 'http://myIP:3030'});

    instance.get('/temperature/highestHours/0.0027/0')
    .then((response) => {
        var tempNow = response.data.data[0].sensorData.temperature;
        document.getElementById("10High").innerHTML = tempNow.toString() + "°C";
    })
    .catch((error) => {
        console.log(error);
    })
}

var change10minLow = () => {
    const instance = axios.create({baseURL: 'http://myIP:3030'});

    instance.get('/temperature/lowestHours/0.0027/0')
    .then((response) => {
        var tempNow = response.data.data[0].sensorData.temperature;
        document.getElementById("10Low").innerHTML = tempNow.toString() + "°C";
    })
    .catch((error) => {
        console.log(error);
    })
}

setInterval(() => {
    changeRecordHigh();
    changeRecordLow();
    change10minHigh();
    change10minLow();
} , 2000);
