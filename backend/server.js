const express = require("express");
const cors = require("cors");
require("dotenv").config();

//const user = require("../models/user");
const userroutes = require("./routes/UserRoutes");

const connectDB = require("./config/db");
const complaintRoutes = require("./routes/ComplaintRoutes");

const app = express();

connectDB();

// middleware
app.use(cors());
app.use(express.json());
app.use("/api/users", userroutes);
app.use("/api/complaints", complaintRoutes);

// test route
app.get("/", (req, res) => {
  res.send("College Complaint System Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});