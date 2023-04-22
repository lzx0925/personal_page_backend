const mongoose = require("mongoose");

const historySchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  gameId: {
    type: String,
    required: true,
  },
  
});

const History = mongoose.model("History", historySchema);

module.exports = History;
