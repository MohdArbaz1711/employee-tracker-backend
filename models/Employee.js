const mongoose = require("mongoose");

const EmployeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  department: String,
  role: String,
  picture: String,
  performance: Object,
});

module.exports = mongoose.model("Employee", EmployeeSchema);
