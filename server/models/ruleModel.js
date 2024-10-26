const mongoose = require("mongoose");

const ruleSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true }, // Enforce unique names
  ruleAST: { type: Object, required: true },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Rule", ruleSchema);
