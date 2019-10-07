let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let superVisorSchema = new Schema({
  superVisorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  statusCode: { type: Number, default: 2 },
  TKBXSessionId: String,
  TKBXTokenId: String,
  createdDate: { type: Date, default: Date.now }
});

const SupervisorStatus = mongoose.model("SupervisorStatus", superVisorSchema);
module.exports = SupervisorStatus;
