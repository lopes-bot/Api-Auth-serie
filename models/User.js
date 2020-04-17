const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// criando o Schema
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//criando model
const User = mongoose.model("User", userSchema);

//exportando o model
module.exports = User;
