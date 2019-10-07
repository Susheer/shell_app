let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let sportsSchema = new Schema({
  sports: {
    type: String,
    enum: [null, "Cricket", "Kabaddi", "Basketball", "Footbal", "Volleyball"]
  }
});

const Sports = mongoose.model("Sports", sportsSchema);
module.exports = Status.schema.path("sports").enumValues;
