const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
    unique: true,
  },
  firstname: {
    type: String,
    required: false,
    default: null,
  },
  lastname: {
    type: String,
    required: false,
    default: null,
  },
  gender: {
    type: String,
    required: false,
    default: null,
  },
  birthday: {
    type: Date,
    default: null,
  },
  headshot: {
    type: String,
    default: "/defaultHead.jpg",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
