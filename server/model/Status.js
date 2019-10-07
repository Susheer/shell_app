let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let statusSchema = new Schema({
  status: {
    type: String,
    enum: ["none", "Online", "Offline", "Engaged"]
  }
});

const Status = mongoose.model("Status", statusSchema);
module.exports = Status.schema.path("status").enumValues;
