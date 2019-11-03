/* global global */
var express = require("express"),
  mongoose = require("mongoose"),
  cookieParser = require("cookie-parser"),
  http = require("http"),
  https = require("https"),
  qs = require("querystring"),
  fs = require("fs"),
  bodyParser = require("body-parser"),
  moment = require("moment"),
  app = express(),
  config = require("./config");
let auth = require("./services/authServices");

let path = require("path");
const busboy = require("connect-busboy");
const uploadPath = path.join(__dirname, "/flags");
const server = http.createServer(app);
global.auth = auth;
global.qs = qs;
global.app = app;
global.https = https;
global.moment = moment;
global.config = config;
global.uploadPath = uploadPath;
global.fs = fs;
global.path = path;
global.db = mongoose.connect(
  config.db_host + config.db_name,
  config.option,
  err => {
    if (err) console.log("database", err);
    console.log("Database connected");
  }
);

global.isMaster = false;
global.mongoose = mongoose;
app.use(bodyParser.json({ limit: "50mb" }));
app.use(
  busboy({
    highWaterMark: 2 * 1024 * 1024 // Set 2MiB buffer
  })
);
app.use(cookieParser());
app.use(express.static("public"));
app.use(express.static("flags"));
//init function

server.listen(config.api_port, () => {
  console.log("server bhag rha hai on port %s", config.api_port);
});

///-----------------------------------------------------------
//          ADD CONTROLLER

let apiRequest = require("./constant/apiRequest");
let contestCtl = require("./controller/contestCtl");
let flagCtl = require("./controller/flagCtl");
let serverUiForm = require("./controller/form");
let matchCtl = require("./controller/matchCtl");
let authController = require("./controller/authController");
let paymentCtl = require("./controller/payment.ctl");

// POST or PUT
var putOrPostFunction = (req, res, redirectFunc) => {
  redirectFunc(req, res);
};

// GET Hello Request
app.get(config.base_url + apiRequest.get.helloRequest.url, (req, res) => {
  console.log("[Hello controller]");
  res.send("Hello recieved");
});

// userLogin
app.post(config.base_url + apiRequest.auth.login.url, (req, res) => {
  console.log("[Post called]");
  putOrPostFunction(req, res, authController.login);
}); // #ffffff

//google login
app.post(config.base_url + apiRequest.auth.login.google, (req, res) => {
  console.log("[/api/login/google]");
  putOrPostFunction(req, res, authController.loginWithGoogle);
});
//facebook login
app.post(config.base_url + apiRequest.auth.login.facebook, (req, res) => {
  console.log("[/api/login/facebook]");
  putOrPostFunction(req, res, authController.loginWithFacebook);
});

//twitter login
app.post(config.base_url + apiRequest.auth.login.twitter, (req, res) => {
  console.log("[/api/login/twitter]");
  putOrPostFunction(req, res, authController.loginWithTwitter);
});

//create user

app.get(config.base_url + apiRequest.post.payment.url, (req, res) => {
  console.log("[request for payment ]");

  putOrPostFunction(req, res, authController.payment);
});

app.post(config.base_url + apiRequest.post.payment.callBack, (req, res) => {
  console.log("[Call back came onpost]");
  putOrPostFunction(req, res, authController.paytmResponse);
});

// add new match matchCtl
//1.
app.post(config.base_url + apiRequest.post.addMatch.url, (req, res) => {
  console.log("[add match ctl]", req.body);
  putOrPostFunction(req, res, matchCtl.add);
});

// 2.  list match
app.get(config.base_url + "/matches/list", (req, res) => {
  console.log("[add match ctl]");
  putOrPostFunction(req, res, matchCtl.list);
});

// ui forms
// 1. upload flags forms
app.get("/admin/flag/upload", (req, res) => {
  putOrPostFunction(req, res, serverUiForm.uploadFlags);
});
// 2. flagController: upload
app.post("/api/flagupload", (req, res, next) => {
  putOrPostFunction(req, res, flagCtl.upload);
});

//3. flagCtl : list files
app.get("/admin/flag/list", (req, res) => {
  console.log("[/admin/flag/list]");
  putOrPostFunction(req, res, flagCtl.list);
});

// contest
//-----------------------

//1 create
app.post(config.base_url + apiRequest.post.contest.create, (req, res) => {
  putOrPostFunction(req, res, contestCtl.create);
});

//2 list by match
app.post(config.base_url + apiRequest.post.contest.listByMatch, (req, res) => {
  putOrPostFunction(req, res, contestCtl.listByMatch);
});

// paymtm api call
// url:/api/pay/paytm
app.post(
  config.base_url + apiRequest.post.pmnt_getway.pay_with_paytm,
  checkToken,
  (req, res, next) => {
    console.log("Route: /api/pay/paytm");

    putOrPostFunction(req, res, paymentCtl.paytmCreatePayment);
  }
);

// url:/api/pay/paytm/res
app.post(
  config.base_url + apiRequest.post.pmnt_getway.paytm_response,
  (req, res) => {
    console.log("Route: /api/pay/paytm");

    putOrPostFunction(req, res, paymentCtl.paytmResponse);
  }
);

function checkToken(req, res, next) {
  //This is just an example, please send token via header
  auth.getUserFromToken(req).then(val => {
    if (!val) {
      console.log("checkToken: if block", val);
      res.status(401);
      return res.send({
        success: false,

        txnUrl: "https://securegw-stage.paytm.in/theia/processTransaction"
      });
    } else {
      console.log("checkToken: else block", val);
      next();
    }
  });
}
