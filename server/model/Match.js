let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let matchesSchema = new Schema({
  title: { type: String, required: true },
  sportsName: { type: Number, required: true },
  status: { type: String, default: "" },
  status_color: { type: String, default: "" },
  startDate: { type: Date, default: Date.now },
  flag_a: { type: String, required: true },
  flag_b: { type: String, required: true },
  team_a: { type: String, required: true },
  team_b: { type: String, required: true },
  enable: { type: Boolean, required: true, default: true },

  flag_a_color: { type: String },
  flag_b_color: { type: String },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const Match = mongoose.model("Match", matchesSchema);
module.exports = Match;
