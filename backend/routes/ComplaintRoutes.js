const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/AuthMiddleware");
const { adminOnly } = require("../middleware/AdminMiddleware");

const {
  createComplaint,
  getMyComplaints,
  updateComplaintStatus,
   assignTechnician,
} = require("../controllers/ComplaintController");



const Complaint = require("../models/Complaint");

// ===============================
// USER ROUTES
// ===============================

// Create complaint
router.post("/", protect, createComplaint);

// Get logged-in user's complaints
router.get("/my", protect, getMyComplaints);

// ===============================
// ADMIN ROUTES
// ===============================

// Get all complaints
router.get("/all", protect, adminOnly, async (req, res) => {
  try {
    const complaints = await Complaint.find().populate("user", "name email");
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// TECHNICIAN: Get assigned complaints
router.get("/technician", protect, async (req, res) => {
  try {
    if (req.user.role !== "technician") {
      return res.status(403).json({ message: "Access denied" });
    }

    const complaints = await Complaint.find({
      assignedTo: req.user._id,
    }).populate("user", "name email");

    res.json(complaints);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// // ADMIN: Assign technician
// router.put("/:id/assign", protect, adminOnly, async (req, res) => {
//   try {
//     const { technicianId } = req.body;

//     const complaint = await Complaint.findById(req.params.id);

//     if (!complaint) {
//       return res.status(404).json({ message: "Complaint not found" });
//     }

//     complaint.assignedTo = technicianId;

//     await complaint.save();

//     res.json({ message: "Technician assigned successfully" });

//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// });

// Update complaint status
router.put("/:id/status", protect, updateComplaintStatus);

//assign technician
router.put("/:id/assign", protect, adminOnly, assignTechnician);

module.exports = router;