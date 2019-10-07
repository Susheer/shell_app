const userModel = require("../model/User");
const JwtService = require("../services/authServices");

const checksum_lib = require("./checksum.js");
const https = require("https");

var PaytmConfig = {
  mid: "XhCMDF15387007592421",
  key: "2PfFyqbbWpLTA2PO",
  website: "WEBSTAGING"
};
const authController = {
  login: async function(req, res) {
    console.log("[AuthCtl  Invoked]", req.body);
    if (!("userId" in req.body) || !("password" in req.body))
      return res.send({
        success: false,
        details: "UserId & password both are required"
      });

    // check null
    if (!req.body.userId || !req.body.password) {
      return res.send({
        success: false,
        details: "UserId & password can not be null"
      });
    }

    // process req..

    let usrId = req.body.userId.trim().toLowerCase();
    let password = req.body.password.trim();
    let user = await userModel.findOne({
      $and: [{ email: usrId }, { password: password }]
    });

    if (user) {
      // send token in body

      //roll  0: none, 1: admin, 2: user, 3: guest
      if (user.roll == 2) {
        let trnsUser = { ...user };
        //  issues access toke
        res.cookie("token", JwtService.issue({ data: trnsUser }), {
          httpOnly: true
        });
        return res.send({
          success: true,
          userData: user
        });
      } else if (user.roll == 1) {
        res.cookie("token", JwtService.issue({ data: user }), {
          httpOnly: true
        });

        return res.send({
          success: true,
          userData: user
        });
      } else {
        return res.send({
          success: false,
          details:
            "Sorry : you do not have to use this service, kindlly contact to admin "
        });
      }
    } else {
      return res.send({
        success: false,
        details: "Invalid user id or password."
      });
    }
  },
  logout: async function(req, res) {
    console.log("get token and remove from  response ...");
    // send back
    res.send("login ok");
  },
  payment: async function(req, res) {
    // orderId, amount, email, mobileNumber,
    let userId = req.query.userId;
    let itemId = req.query.itemId;

    if (!userId || !itemId) {
      res.writeHead(401, { "Content-Type": "text/html" });
      res.write(
        '<html><head><title>Invalid Access</title></head><body><center><p style="text-align:center; color:red;line-height:50vh; height:100%;">Opps!! Somthing went wrong</hp></center></body></html>'
      );
      return res.end();
    }
    console.log("userId", userId);
    console.log("itemId", itemId);

    var params = {};
    params["MID"] = PaytmConfig.mid;
    params["WEBSITE"] = PaytmConfig.website;
    params["CHANNEL_ID"] = "WEB";
    params["INDUSTRY_TYPE_ID"] = "Retail";
    params["ORDER_ID"] = "" + new Date().getTime();
    params["CUST_ID"] = "Customer001";
    params["TXN_AMOUNT"] = "1.00";
    params["CALLBACK_URL"] =
      global.config.api_Host +
      ":" +
      global.config.api_port +
      "/api/user/callback";
    params["EMAIL"] = "abc@mailinator.com";
    /*  params["MOBILE_NO"] = "7777777777"; */
    checksum_lib.genchecksum(params, PaytmConfig.key, function(err, checksum) {
      var txn_url = "https://securegw-stage.paytm.in/theia/processTransaction"; // for staging
      // var txn_url = "https://securegw.paytm.in/theia/processTransaction"; // for production

      var form_fields = "";
      for (var x in params) {
        form_fields +=
          "<input type='hidden' name='" + x + "' value='" + params[x] + "' >";
      }
      form_fields +=
        "<input type='hidden' name='CHECKSUMHASH' value='" + checksum + "' >";

      res.writeHead(200, { "Content-Type": "text/html" });
      res.write(
        '<html><head><title>processing</title></head><body><center><p style="text-align:center; color:#315ba7; font-size:15px; line-height:50vh; height:100%;">Please do not refresh this page...</p></center><form method="post" action="' +
          txn_url +
          '" name="f1">' +
          form_fields +
          '</form><script type="text/javascript">document.f1.submit();</script></body></html>'
      );
      res.end();
    });
  },
  paytmResponse: async function(req, res) {
    console.log("Paytm Callback ctl");
    var post_data = "";
    let html = "";
    post_data = req.body;
    let checksumhash = post_data.CHECKSUMHASH;

    console.log("------------------------------");

    delete post_data.CHECKSUMHASH;
    console.log("------------------------------After deleting");
    console.log("Body ", post_data);
    let result = checksum_lib.verifychecksum(
      post_data,
      PaytmConfig.key,
      checksumhash
    );
    console.log("Checksum Result => ", result, "\n");
    // Send Server-to-Server request to verify Order Status
    let params = { MID: PaytmConfig.mid, ORDERID: post_data.ORDERID };

    checksum_lib.genchecksum(params, PaytmConfig.key, function(err, checksum) {
      params.CHECKSUMHASH = checksum;
      post_data = "JsonData=" + JSON.stringify(params);

      var options = {
        hostname: "securegw-stage.paytm.in", // for staging
        // hostname: 'securegw.paytm.in', // for production
        port: 443,
        path: "/merchant-status/getTxnStatus",
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Content-Length": post_data.length
        }
      };

      // Set up the request
      var response = "";
      var post_req = https.request(options, function(post_res) {
        post_res.on("data", function(chunk) {
          response += chunk;
        });

        post_res.on("end", function() {
          console.log("S2S Response: ", response, "\n");

          var _result = JSON.parse(response);
          if (_result && _result.RESPCODE == "01") {
            //  transaction success
            html =
              "<html><head><title>Completed," +
              _result.TXNID +
              "," +
              _result.ORDERID +
              "</title></head><body>  <p>We have received your payment.</p><p>Tranaction ID:" +
              _result.TXNID +
              "</p><p>OrderId:" +
              _result.ORDERID +
              "</p> <strong>please keep this transaction ID for future reference. <br>Once the game is enabled successful, you will recieve a confirmation message. <br>To check status, Whatsapp 'status yourOrderId'<br> Thanks !! </p>  </body><center>";
          } else {
            //  transaction failed
            html =
              "<html><head><title>Payment failed," +
              _result.TXNID +
              "," +
              _result.ORDERID +
              "," +
              _result.RESPMSG +
              "</title></head><body><p>Transaction failed </p><p>Tranaction ID:" +
              _result.TXNID +
              " </p><p>Order ID:" +
              _result.ORDERID +
              " </p> <p>Paytm response: " +
              _result.RESPMSG +
              "</p><p>If you query related to your payment<br>Whatsapp on 8948451168</p><p>status <your OrderId> <loginId></p></body><center>";
          }

          console.log("result", _result);
          res.writeHead(200, { "Content-Type": "text/html" });
          res.write(html);
          res.end();
        });
      });

      // post the data
      post_req.write(post_data);
      post_req.end();
    });
    // end method here
  }
};

module.exports = authController;
