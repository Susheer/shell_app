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

let path = require("path");
const busboy = require("connect-busboy");
const uploadPath = path.join(__dirname, "/flags");
const server = http.createServer(app);
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
