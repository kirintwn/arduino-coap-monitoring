var coap = require("coap");
var bl = require('bl');
var stdin = process.openStdin();

stdin.addListener("data", function(d) {
    var command = d.toString().trim();

    getData(command , (data) => {
        console.log(data);
    });
  });

var getData = (command , callback) => {
    console.log(command);
    var req = coap.request({
        pathname: `/${command}`,
        options: {
            "Accept": "application/json"
        }
    });

    req.on("response" , (res) => {
        if (res.code !== "2.05") return process.exit(1);

        res.pipe(bl(function(err, data) {
            var payload = JSON.parse(data);
            callback(payload);
        }))
    });
    req.end();
}
