const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcryptjs");

// criando o Schema
const userSchema = new Schema({
  method: {
    type: String,
    enum: ["local", "google", "facebook"],
    required: true,
  },
  local: {
    email: {
      type: String,
      lowercase: true,
    },
    password: {
      type: String,
    },
  },
  google: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
  facebook: {
    id: {
      type: String,
    },
    email: {
      type: String,
      lowercase: true,
    },
  },
});

userSchema.pre("save", async function (next) {
  try {
    if (this.method !== "local") {
      next();
    }
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(this.local.password, salt);
    /*console.log("salt", salt);
    console.log("normal password", this.password);
    console.log("Hash Password", passwordHash);*/
    this.local.password = passwordHash;
    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.isValidPassword = async function (newPassword) {
  try {
    return await bcrypt.compare(newPassword, this.local.password);
  } catch (error) {
    throw new Error(error);
  }
};
//criando model
const User = mongoose.model("User", userSchema);

//exportando o model
module.exports = User;
