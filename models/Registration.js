const mongoose = require("mongoose");
const { Schema, model } = mongoose;

const registrationSchema = new Schema({
  text: String,
  dateSent: Date,
});

const UnknownInputs = model("unknown", registrationSchema);

module.exports = UnknownInputs;
