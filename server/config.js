var config = {
  db_host: "mongodb://localhost:27017/",
  db_name: "shell_app",
  api_port: "4000",
  client_port: "3000",
  api_Host: "http://localhost",
  shard_db: false,
  base_url: "/api",
  client: {
    ptmSuccess_url: "http://localhost:3000/payment_success",
    ptmFailed_url: "http://localhost:3000/PaymentFailed",
    ptm_vrfn_failed_url: "http://localhost:3000/payment_verification_failed",
    ptm_server_problam: "http://localhost:3000/server_problem",
    userLogin: "http://localhost:3000/login"
  },
  secretKey: "sudheerShell_app",
  option: {
    useNewUrlParser: true
  },
  openTok: {
    apiKey: "46389042",
    secret: ""
  }

  //Log config
};

module.exports = config;
