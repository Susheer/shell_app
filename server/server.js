/* global global */
var cluster = require("cluster"),
  express = require("express"),
  mongoose = require("mongoose"),
  cookieParser = require("cookie-parser"),
  http = require("http"),
  https = require("https"),
  qs = require("querystring"),
  fs = require("fs"),
  moment = require("moment"),
  bodyParser = require("body-parser"),
  multipart = require("connect-multiparty"),
  app = express(),
  config = require("./config");

const server = http.createServer(app);
global.qs = qs;
global.app = app;
global.https = https;
global.moment = moment;
global.config = config;
global.fs = fs;
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

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));
app.use(multipart());
app.use(cookieParser());
//init function

server.listen(config.api_port, () => {
  console.log("server bhag rha hai on port %s", config.api_port);
});

///-----------------------------------------------------------
//          ADD CONTROLLER

let apiRequest = require("./constant/apiRequest");
let authController = require("./controller/authController");
let userController = require("./controller/userController");
let sessionController = require("./controller/sessionCtl");
let gameController = require("./controller/gameController");
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
app.post(config.base_url + apiRequest.post.createUser.url, (req, res) => {
  console.log("[user Create route ]");
  putOrPostFunction(req, res, userController.createUser);
});

//List suprvisor
app.post(config.base_url + apiRequest.post.getSupervisors.url, (req, res) => {
  console.log("[supervisor list route]");
  global.timer = setInterval(() => {
    putOrPostFunction(req, res, sessionController.getSupervisors);
  }, 1000);
});

// connect session
app.post(config.base_url + apiRequest.post.connectSession.url, (req, res) => {
  console.log("[connect session  route]");

  putOrPostFunction(req, res, sessionController.connectSession);
});

// get all contacts from list
app.get(config.base_url + apiRequest.post.contacts.url, (req, res) => {
  console.log("[Contacts from list]");

  putOrPostFunction(req, res, userController.contactList);
});

app.post(config.base_url + apiRequest.post.getSupervisor.url, (req, res) => {
  console.log("[getSupervisor ]");

  putOrPostFunction(req, res, sessionController.getSupervisor);
});

// supervisor status calls

//makeOnline suprVisor
app.post(config.base_url + apiRequest.post.makeOnline.url, (req, res) => {
  console.log("[Make online route]");
  putOrPostFunction(req, res, sessionController.makeOnline);
});

//makeOffline suprVisor
app.post(config.base_url + apiRequest.post.makeOffline.url, (req, res) => {
  console.log("[Make offline route]");
  putOrPostFunction(req, res, sessionController.makeOffline);
});

//makeEngaged suprVisor
app.post(config.base_url + apiRequest.post.makeEngaged.url, (req, res) => {
  console.log("[Make engaged route]");
  putOrPostFunction(req, res, sessionController.makeEngaged);
});

app.get(config.base_url + apiRequest.post.payment.url, (req, res) => {
  console.log("[request for payment ]");

  putOrPostFunction(req, res, authController.payment);
});

app.post(config.base_url + apiRequest.post.payment.callBack, (req, res) => {
  console.log("[Call back came onpost]");

  putOrPostFunction(req, res, authController.paytmResponse);
});

// game
app.post(config.base_url + apiRequest.post.addGame.url, (req, res) => {
  console.log("[addGame.url]");

  putOrPostFunction(req, res, gameController.add);
});

//  game list
app.post(config.base_url + apiRequest.post.listGame.url, (req, res) => {
  console.log("[listGame.url]");

  putOrPostFunction(req, res, gameController.gamesList);
});
