const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({ msg: "Invalid credentials" });
  }

  const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT_SECRET);
  res.json({ token, role: user.role });
};
