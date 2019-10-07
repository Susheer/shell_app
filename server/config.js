var config = {
  db_host: "mongodb://localhost:27017/",
  db_name: "Onet",
  api_port: "4000",
  api_Host: "http://192.168.43.189",
  shard_db: false,
  base_url: "/api",
  secretKey: "sudheerOnet",
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
