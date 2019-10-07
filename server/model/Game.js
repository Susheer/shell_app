let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let gameSchema = new Schema({
  title: { type: String, required: true },
  startDate: { type: Date, default: Date.now },
  icon: { type: String, required: true },
  notification: { type: String, required: true, default: null },
  enable: { type: Boolean, required: true, default: true },
  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const Game = mongoose.model("Game", gameSchema);
module.exports = Game;
