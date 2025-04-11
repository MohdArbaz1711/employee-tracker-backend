const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  role: {
    type: String,
    enum: ["Admin", "Manager", "Employee"],
    default: "Employee",
  },
});

module.exports = mongoose.model("User", UserSchema);
