const mongoose = require("mongoose");

const wordleSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  stage: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Wordle = mongoose.model("Wordle", wordleSchema);

module.exports = Wordle;
