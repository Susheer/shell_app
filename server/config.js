var config = {
  db_host: "mongodb://localhost:27017/",
  db_name: "shell_app",
  api_port: "4000",
  api_Host: "http://localhost",
  shard_db: false,
  base_url: "/api",
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
