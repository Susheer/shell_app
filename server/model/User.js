let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let userSchema = new Schema({
  fullName: String,
  email: String,
  password: String,
  roll: { type:Number, default: 2 },
  notificationEnabled:{ type:Boolean, default: false },
  disabled:{ type:Boolean, default: false },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);
module.exports = User;
