let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let settingSchema = new Schema({
  userId: String,
  password: String
});

const Setting = mongoose.model("Setting", settingSchema);
module.exports = Setting;
