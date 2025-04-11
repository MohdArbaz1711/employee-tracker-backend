const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });
router.post("/upload", upload.single("picture"), (req, res) => {
  res.json({ filename: req.file.filename });
});
