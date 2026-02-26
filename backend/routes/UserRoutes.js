const express = require("express");
const router = express.Router();

const { registerUser, loginUser } = require("../controllers/UserController");
const { protect } = require("../middleware/AuthMiddleware");
const { adminOnly } = require("../middleware/AdminMiddleware");
const User = require("../models/User");


router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected test route
router.get("/profile", protect, (req, res) => {
  res.json({
    message: "You accessed protected route",
    user: req.user
  });
});

// Get all technicians (Admin only)
router.get("/technicians", protect, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const technicians = await User.find({ role: "technician" }).select("name email");

    res.json(technicians);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


module.exports = router;