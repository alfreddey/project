const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Please provide your email."],
    unique: true,
  },
  username: {
    type: String,
    required: [true, "Please provide your username."],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please provide your password."],
    maxLength: 256,
  },
  role: {
    type: String,
    enum: ["admin", "regular"],
    default: "regular",
    required: [true, "Please provide user role."],
  },
  createdAt: {
    type: String,
    default: new Date(),
  },
});

UserSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

UserSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

module.exports = mongoose.model("User", UserSchema);
