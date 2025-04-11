const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: String,
  description: String,
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: "Employee" }],
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
