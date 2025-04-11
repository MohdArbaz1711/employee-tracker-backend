const express = require("express");
const router = express.Router(); // ✅ This line is needed!
const multer = require("multer");
const path = require("path");

// Configure Multer
const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Upload Profile Picture Endpoint
router.post("/upload", upload.single("picture"), (req, res) => {
  res.json({ filename: req.file.filename });
});

module.exports = router;
