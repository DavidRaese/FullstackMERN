const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// create schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: string,
    required: true,
    unique: true
  },
  password: {
    type: string,
    required: true
  },
  avatar: {
    type: string,
    required: true
  },
  date: {
    type: string,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
