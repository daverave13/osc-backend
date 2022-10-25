var express = require("express");
var router = express.Router();
var axios = require("axios");

/* GET users listing. */
router.post("/", function (req, res, next) {

  const salesOrderNumber = req.body.salesOrderNumber;

  const raw = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://niagarawater.com/servicecloud">
    <soapenv:Header/>
    <soapenv:Body>
        <ServiceRequest xmlns="http://niagarawater.com/servicecloud" xmlns:xsd="http://www.w3.org/2001/XMLSchema" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
            <CloudRequest>
                <!--Optional:-->
                    <salesOrderNumber>${salesOrderNumber}</salesOrderNumber>
                <actionCode>HEADERS</actionCode>
            </CloudRequest>
        </ServiceRequest>
    </soapenv:Body>
</soapenv:Envelope>`;

  var config = {
    method: "post",
    url: "https://svc.niagarawater.com:5443/API/OSC/PS/QueryOrder",
    headers: {
      origin: "https://niagarawater--tst1.custhelp.com",
      "Content-Type": "application/xml",
    },
    data: raw,
  };

  axios(config)
    .then(function (response) {
      res.send(JSON.stringify(response.data));
    })
    .catch(function (error) {
      console.log(error);
      res.send(error);
    });
});

module.exports = router;
