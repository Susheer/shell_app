var config = {
  db_host: "mongodb://localhost:27017/",
  db_name: "shell_app",
  api_port: "4000",
  client_port: "3000",
  api_Host: "http://13.235.80.206",
  shard_db: false,
  base_url: "/api",
  client: {
    ptmSuccess_url: "http://13.235.80.206:3000/payment_success",
    ptmFailed_url: "http://13.235.80.206:3000/PaymentFailed",
    ptm_vrfn_failed_url:
      "http://13.235.80.206:3000/payment_verification_failed",
    ptm_server_problam: "http://13.235.80.206:3000/server_problem"
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
