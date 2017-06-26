var showAlert = 1;

function click1(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://myIP:3030/LED",
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "e985f6da-eebd-d2e3-36e3-3c040f9771a7"
      },
      "processData": false,
      "data": "{\n\t\"LEDstate\":\"YYYYYY\"\n}"
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      document.getElementById("button1").style.backgroundColor = "#5c8a8a";
      document.getElementById("button1").style.color = "white";
      document.getElementById("button2").style.backgroundColor = "white";
      document.getElementById("button2").style.color = "black";
      document.getElementById("button3").style.backgroundColor = "white";
      document.getElementById("button3").style.color = "black";
      $.notify("LED Turned Always On", "success");

    });
};
function click2(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://myIP:3030/LED",
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "e985f6da-eebd-d2e3-36e3-3c040f9771a7"
      },
      "processData": false,
      "data": "{\n\t\"LEDstate\":\"NNNNNN\"\n}"
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      document.getElementById("button1").style.backgroundColor = "white";
      document.getElementById("button1").style.color = "black";
      document.getElementById("button2").style.backgroundColor = "#5c8a8a";
      document.getElementById("button2").style.color = "white";
      document.getElementById("button3").style.backgroundColor = "white";
      document.getElementById("button3").style.color = "black";
      $.notify("LED Turned Always Off", "success");
    });
};
function click3(){
    var settings = {
      "async": true,
      "crossDomain": true,
      "url": "http://myIP:3030/LED",
      "method": "PUT",
      "headers": {
        "content-type": "application/json",
        "cache-control": "no-cache",
        "postman-token": "e985f6da-eebd-d2e3-36e3-3c040f9771a7"
      },
      "processData": false,
      "data": "{\n\t\"LEDstate\":\"AAAAAA\"\n}"
    }

    $.ajax(settings).done(function (response) {
      console.log(response);
      document.getElementById("button1").style.backgroundColor = "white";
      document.getElementById("button1").style.color = "black";
      document.getElementById("button2").style.backgroundColor = "white";
      document.getElementById("button2").style.color = "black";
      document.getElementById("button3").style.backgroundColor = "#5c8a8a";
      document.getElementById("button3").style.color = "white";
      showAlert = 1;
      $.notify("LED Turned Auto Detect Mode", "success");
    });
};

var alert = () => {
    //var tempNow = response.data.data[0].sensorData.temperature;
    //document.getElementById("recordHigh").innerHTML = tempNow.toString() + "°C";
    const instance = axios.create({baseURL: 'http://myIP:3030'});

    instance.get('/arduinoData/0')
    .then((response) => {
        var nowLED = response.data.data[0].LEDstate;
        var nowTemp = response.data.data[0].sensorData.temperature;
        if(nowLED == 1) {
            document.getElementById("circle1").setAttribute("fill", "#FFD700");
            //console.log("nowLED 1" , nowLED);
        }
        else if(nowLED == 0) {
            document.getElementById("circle1").setAttribute("fill", "#AAAAAA");
            //console.log("nowLED 0" , nowLED);
        }

        if(nowTemp >= 30 && showAlert == 1) {
            $.notify("Temperature Too High", "error");
            showAlert = 0;
        }
        else if(nowTemp < 30) {
            showAlert = 1;
        }
    })
    .catch((error) => {
        console.log(error);
    })
}

setInterval(function(){alert()} , 800);
