let mongoose = require("mongoose");
mongoose.set("useFindAndModify", false);
let Schema = mongoose.Schema;
let paymentSchema = new Schema({
  USER_Id: { type: String, required: true },
  ITEM_ID: { type: mongoose.Schema.Types.ObjectId, ref: "Item" },
  TXNID: String,
  BANKTXNID: String,
  TXNAMOUNT: String,
  STATUS: String,
  TXNTYPE: String,
  GATEWAYNAME: String,
  RESPCODE: Number,
  RESPMSG: String,
  BANKNAME: String,
  MID: String,
  PAYMENTMODE: Number,
  REFUNDAMT: String,
  TXNDATE: String,

  createdDate: { type: Date, default: Date.now },
  updatedDate: { type: Date, default: Date.now }
});

const Payment = mongoose.model("Payment", paymentSchema);
module.exports = Payment;
