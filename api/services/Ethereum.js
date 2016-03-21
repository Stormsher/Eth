var request = require("request");

module.exports = {

  getInfo: function(options, callback) {
    var url = "http://alpha61.com/ethereum.json"
    request({
      url: url,
      json: true
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        body =  body.substr(16);
        body = body.substr(0, body.length - 1);
        callback (null,  JSON.parse(body));
      }
    });
  },
  getPrice: function(options, callback) {
    var url = "http://api.etherscan.io/api?module=stats&action=ethprice";
    request({
      url: url,
      json: true
    }, function(error, response, body) {
      if (!error && response.statusCode === 200) {
        callback (null,  body.result);
      }
    });
  }
};
