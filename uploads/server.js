const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

connectDB();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/auth", require("./routes/auth"));
app.use("/api/employees", require("./routes/employees"));
app.use("/api/projects", require("./routes/projects"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
