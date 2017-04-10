var coap = require("coap");
var server = coap.createServer();
var stdin = process.openStdin();
var command = "same";

stdin.addListener("data", function(d) {
     command = d.toString().trim();
});


server.on("request", (req, res) => {
    //console.log(req.headers);

    var tempData = req.url.split('/')[1];
    //console.log("tempData:" , tempData);

    if (req.headers["Accept"] != "application/json") {
        res.code = "4.06";
        return res.end();
    }

    res.setOption("Content-Format" , "application/json");

    /////////update tempData to DB////////////
    var now = new Date().toString();
    console.log(now);
    console.log("update tempData: " , tempData);
    console.log(" ");
    //////////////////////////////////////////

    var payload = {
        LEDchange: command
    };

    command = "same";

    res.end(JSON.stringify(payload));

});

server.listen( () => {
    console.log("server started");
});
