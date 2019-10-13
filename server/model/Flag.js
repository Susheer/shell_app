let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let flagSchema = new Schema({
  title: { type: String, required: true },
  color: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const Flag = mongoose.model("Flag", flagSchema);
module.exports = Flag;
