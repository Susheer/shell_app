let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let rollSchema = new Schema({
  roll: {
    type: String,
    enum: ["", "admin", "user","guest"]
  }
});

const Roll = mongoose.model("Roll", rollSchema);
module.exports = Roll.schema.path("roll").enumValues;
