var currentTime;
var secondTime;
//updateChart(dataLength);
window.onload = function () {
    click3();

    var dps = []; // dataPoints

    var chart = new CanvasJS.Chart("chartContainer",{
        backgroundColor: "#F8F8FF",
        //zoomEnabled: true,
        //zoomType: "xy",
        animationEnabled: true,
        //theme: "theme2",
        axisX: {
            //title: "Time",
            gridColor: "Silver",
            tickColor: "silver",
            interval: 1,
            intervalType: "second",
            valueFormatString: "HH:mm:ss"
        },
        axisY: {
            title: "°C",
			gridColor: "Silver",
			tickColor: "silver",
            includeZero: false
		},
        legend: {
			verticalAlign: "center",
			horizontalAlign: "right"
		},
        data: [{
            type: "line",
            markerSize: 10,
            dataPoints: dps
        }]
    });

    var updateInterval = 2000;
    var dataLength = 20; // number of dataPoints visible at any point

    var updateChart = function (count) {
        count = count || 1;
        //console.log("count: " , count);
        // count is number of times loop runs to generate random dataPoints.
        ////////////////////////////////////////////////////////////////////////
        const instance = axios.create({baseURL: 'http://myIP:3030'});

        instance.get('/arduinoData/0')
        .then((response) => {
            currentTime = response.data.data[0].timeUpdate;

            var tempNow = response.data.data[0].sensorData.temperature;
            document.getElementById("nameTemp").innerHTML = "Arduino Live Temperature : " + tempNow.toString() + "°C";

            for (var j = count -1 ; j >= 0; j--) {
                //console.log(response.data.data[j].timeUpdate);
                //console.log(response.data.data[j].sensorData.temperature);

                var xDate = new Date(response.data.data[j].timeUpdate);

                dps.push({
                    x: xDate,
                    y: response.data.data[j].sensorData.temperature
                });
            };

        })
        .catch((error) => {
            console.log(error);
        })
        if (dps.length > dataLength) {
            dps.shift();
        }
        chart.render();
    };

    // generates first set of dataPoints
    updateChart(dataLength);

    // update chart after specified time.
    //setInterval(function(){updateChart()}, updateInterval);
    setInterval(function(){newDataChecker()} , 400);

    var newDataChecker = () => {
        updater();
        //console.log("currentTime: " , currentTime);
        //console.log("secondTime: " , secondTime);
        if(currentTime != secondTime) {
            updateChart();
        }
    };
};



var updater = () => {
    const instance1 = axios.create({baseURL: 'http://myIP:3030'});
    instance1.get('/arduinoData/0')
    .then((response1) => {
        secondTime = response1.data.data[0].timeUpdate;
    })
    .catch((error) => {
        console.log(error);
    });
};
