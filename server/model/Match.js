let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let matchesSchema = new Schema({
  title: { type: String, required: true },
  sportsName: { type: Number, required: true },
  status: { type: String },
  startDate: { type: Date, default: Date.now },
  flag_a: { type: String, required: true },
  flag_b: { type: String, required: true },
  team_a: { type: String, required: true },
  team_b: { type: String, required: true },
  enable: { type: Boolean, required: true, default: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const Matches = mongoose.model("Matches", matchesSchema);
module.exports = Matches;
