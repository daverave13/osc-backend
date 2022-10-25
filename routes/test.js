var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET users listing. */
router.post("/", function (req, res, next) {
  var https = require('follow-redirects').https;
var fs = require('fs');

var options = {
  'method': 'POST',
  'hostname': 'svc.niagarawater.com',
  'port': 5443,
  'path': '/API/OSC/PS/QueryOrder',
  'headers': {
    'Content-Type': 'application/xml',
    'Cookie': 'BIGipServersoa_http_pool=635592458.24862.0000'
  },
  'maxRedirects': 20
};

var req = https.request(options, function (res) {
  var chunks = [];

  res.on("data", function (chunk) {
    chunks.push(chunk);
  });

  res.on("end", function (chunk) {
    var body = Buffer.concat(chunks);
    console.log(body.toString());
  });

  res.on("error", function (error) {
    console.error(error);
  });
});

var postData =  "<soapenv:Envelope xmlns:soapenv=\"http://schemas.xmlsoap.org/soap/envelope/\" xmlns:ser=\"http://niagarawater.com/servicecloud\">\r\n    <soapenv:Header/>\r\n    <soapenv:Body>\r\n        <ServiceRequest xmlns=\"http://niagarawater.com/servicecloud\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:xsi=\"http://www.w3.org/2001/XMLSchema-instance\">\r\n            <CloudRequest>\r\n                <!--Optional:-->\r\n                    <salesOrderNumber>123</salesOrderNumber>\r\n                <actionCode>HEADERS</actionCode>\r\n            </CloudRequest>\r\n        </ServiceRequest>\r\n    </soapenv:Body>\r\n</soapenv:Envelope>";

req.write(postData);

req.end();
  
});

module.exports = router;
