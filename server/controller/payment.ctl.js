/* const userModel = require("../model/User");
const JwtService = require("../services/authServices"); */
const querystring = require("querystring");
const checksum_lib = require("./checksum.js");
const clientConfig = global.config.client;
var PaytmConfig = {
  mid: "XhCMDF15387007592421",
  key: "2PfFyqbbWpLTA2PO",
  website: "WEBSTAGING"
};
const paymentController = {
  paytmCreatePayment: async function(req, res) {
    // orderId, amount, email, mobileNumber,

    let reqBody = {
      userId: null,
      itemId: null,
      amount: null
    };

    reqBody.userId = req.body.userId;
    reqBody.itemId = req.body.itemId;
    reqBody.amount = req.body.entryFee;

    console.log("req.body", req.body);
    console.log("reqBody", reqBody);

    var params = {};
    params["MID"] = PaytmConfig.mid;
    params["WEBSITE"] = PaytmConfig.website;
    params["CHANNEL_ID"] = "WEB";
    params["INDUSTRY_TYPE_ID"] = "Retail";
    params["ORDER_ID"] = "" + new Date().getTime();
    params["CUST_ID"] = "Customer001";
    params["TXN_AMOUNT"] = reqBody.amount + ".00";
    params["CALLBACK_URL"] =
      global.config.api_Host +
      ":" +
      global.config.api_port +
      "/api/pay/paytm/res";
    params["EMAIL"] = "abc@mailinator.com";
    /*  params["MOBILE_NO"] = "7777777777"; */

    // generate checksum
    checksum_lib.genchecksum(params, PaytmConfig.key, function(err, checksum) {
      if (err) {
        return res.send({
          success: false,
          param: params,
          checksum: checksum,
          txnUrl: "https://securegw-stage.paytm.in/theia/processTransaction"
        });
      }
      return res.send({
        success: true,
        param: params,
        checksum: checksum,
        txnUrl: "https://securegw-stage.paytm.in/theia/processTransaction"
      });
    });
  },
  paytmResponse: async function(req, res) {
    console.log("Paytm Callback ctl");
    let fullBody = "";
    req.on("data", function(chunk) {
      console.log("Req.on");
      fullBody += chunk.toString();
    });
    req.on("end", function() {
      console.log("Req.end");
      let decodedBody = querystring.parse(fullBody);
      // get received checksum
      let checksum = decodedBody.CHECKSUMHASH;
      // remove this from body, will be passed to function as separate argument
      delete decodedBody.CHECKSUMHASH;
      // verify checksum
      let result = checksum_lib.verifychecksum(
        decodedBody,
        PaytmConfig.key,
        checksum
      );

      console.log("Checksum Result => ", result, "\n");
      if (result) {
        if (decodedBody && decodedBody.RESPCODE == "01") {
          console.log("Payemnt Successfyll", clientConfig);
          console.log("decodedBody", decodedBody);
          res.redirect(clientConfig.ptmSuccess_url);
        } else {
          // transaciton failed
          console.log("Payemnt failed");
          console.log("decodedBody", decodedBody);
          res.redirect(clientConfig.ptmFailed_url);
        }
      } else {
        // transaction failed
        console.log("Payemnt checksum verification failed");
        console.log("decodedBody", decodedBody);
        res.redirect(clientConfig.ptm_vrfn_failed_url);
      }
    });
    req.on("error", function(e) {
      console.log("Somthing went wrong !!! " + e.message);
      res.redirect(clientConfig.ptm_server_problam);
    });

    // end method here
  }
};

module.exports = paymentController;
