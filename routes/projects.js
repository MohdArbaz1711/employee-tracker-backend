const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const roles = require("../middleware/roles");
const {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

// All routes below are protected
router.use(auth);

// Get all projects
router.get("/", getAllProjects);

// Get single project
router.get("/:id", getProjectById);

// Create new project (Only Admin or Manager)
router.post("/", roles(["Admin", "Manager"]), createProject);

// Update project (Only Admin or Manager)
router.put("/:id", roles(["Admin", "Manager"]), updateProject);

// Delete project (Only Admin)
router.delete("/:id", roles(["Admin"]), deleteProject);

module.exports = router;
