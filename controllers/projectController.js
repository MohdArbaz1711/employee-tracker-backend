const Project = require("../models/Project");
const Employee = require("../models/Employee");

// Get all projects
exports.getAllProjects = async (req, res) => {
  try {
    const projects = await Project.find().populate("assignedTo", "name email");
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get project by ID
exports.getProjectById = async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate("assignedTo");
    if (!project) return res.status(404).json({ msg: "Project not found" });
    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Create new project
exports.createProject = async (req, res) => {
  try {
    const { name, description, assignedTo, status } = req.body;

    const newProject = new Project({
      name,
      description,
      assignedTo,
      status,
    });

    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Update project details
exports.updateProject = async (req, res) => {
  try {
    const { name, description, assignedTo, status } = req.body;

    const project = await Project.findByIdAndUpdate(
      req.params.id,
      { name, description, assignedTo, status },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete project
exports.deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.json({ msg: "Project deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
