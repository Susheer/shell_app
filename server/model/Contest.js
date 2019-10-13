let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let contestSchema = new Schema({
  match: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Match"
  },
  creater: {
    type: mongoose.Schema.Types.ObjectId,

    default: null
  },
  title: { type: String, required: true, default: "Prize Pool" },
  status: { type: String, default: "Entry" },
  poolAmount: { type: String, default: 0 },
  entryFee: { type: Number, default: 0 },
  poolSize: { type: Number, default: 30000 },
  occupied: { type: Number, default: 0 },
  updatedDate: { type: Date, default: Date.now },
  createdDate: { type: Date, default: Date.now }
});

const Contest = mongoose.model("Contest", contestSchema);
module.exports = Contest;
