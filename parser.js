var request = require("request");
var cheerio = require("cheerio");

request("http://teleindicatore.eavsrl.it", function(error, response, body) {
        var $ = cheerio.load(body);
        var list = $(".Cella");
        var i = 0;
	var result = [];
	var suppressions = [];
	var departures = [];
        while (i < list.length) {
                var parent = list[i].parent;
		var elements = parent.children;
                var length = elements.length;
		var destination = elements[0].children[0].data;
		var transitStation = elements[1].children[0].data.replace("(","").replace(")","");
		var type = elements[2].children[0].data
		var departureTime = elements[3].children[0].data
                if (length == 5) {
			var track = elements[4].children[0].data;
			departures.push({destination: destination, transitStation: transitStation, type: type, departureTime: departureTime, track: track});
                } else if (length == 4) {
			suppressions.push({destination: destination, type: type, departureTime: departureTime});
                }
                i += length;
        }
	result.push({departures: departures, suppressions: suppressions});
	console.log(JSON.stringify(result))
});

