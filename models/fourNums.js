const mongoose = require("mongoose");

const fourNumsSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  status: {
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

const FourNums = mongoose.model("FourNums", fourNumsSchema);

module.exports = FourNums;
