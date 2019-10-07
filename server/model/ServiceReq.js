let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let serviceReqSchema = new Schema({
  supervisorOnlineId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SupervisorStatus"
  },
  superVisorId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  startTime: { type: Date, default: Date.now },
  endTime: { type: Date, default: Date.now },
  duration: { type: Number, default: 0 },
  createdDate: { type: Date, default: Date.now }
});

const ServiceReq = mongoose.model("ServiceReq", serviceReqSchema);
module.exports = ServiceReq;
