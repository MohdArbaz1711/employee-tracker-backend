 const Employee = require("../models/Employee");
const path = require("path");

// Get all employees with optional search, filter, and sort
exports.getAllEmployees = async (req, res) => {
  const { search, department, sortBy } = req.query;
  let query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  if (department) {
    query.department = department;
  }

  try {
    let employees = await Employee.find(query);

    if (sortBy) {
      employees = employees.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
    }

    res.json(employees);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Get single employee profile
exports.getEmployeeById = async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if (!emp) return res.status(404).json({ msg: "Employee not found" });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Add new employee
exports.addEmployee = async (req, res) => {
  try {
    const { name, email, department, role } = req.body;
    const picture = req.file ? req.file.filename : null;

    const newEmp = new Employee({
      name,
      email,
      department,
      role,
      picture,
    });

    await newEmp.save();
    res.status(201).json(newEmp);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Edit employee details
exports.updateEmployee = async (req, res) => {
  try {
    const updatedData = { ...req.body };
    if (req.file) {
      updatedData.picture = req.file.filename;
    }

    const updated = await Employee.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};

// Delete employee
exports.deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);
    res.json({ msg: "Employee deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server Error" });
  }
};
