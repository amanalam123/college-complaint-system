const Complaint = require("../models/Complaint");

// Create Complaint
exports.createComplaint = async (req, res) => {
  try {
    const { title, description, category } = req.body;

    const complaint = await Complaint.create({
      title,
      description,
      category,
      user: req.user.id
    });

    res.status(201).json({
      message: "Complaint submitted successfully",
      complaint
    });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


// Get My Complaints
exports.getMyComplaints = async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id });

    res.status(200).json(complaints);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// update complain status
// Update Complaint Status (Admin Reject / Technician Resolve)
exports.updateComplaintStatus = async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    // =============================
    // ADMIN → Can only Reject
    // =============================
    if (req.user.role === "admin") {
      complaint.status = "Rejected";
      await complaint.save();
      return res.json({ message: "Complaint rejected by admin" });
    }

    // =============================
    // TECHNICIAN → Can only Resolve
    // =============================
    if (req.user.role === "technician") {

      // Check complaint is assigned to this technician
      if (!complaint.assignedTo || complaint.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ message: "Not your assigned complaint" });
      }

      complaint.status = "Resolved";
      await complaint.save();
      return res.json({ message: "Complaint marked as resolved" });
    }

    // =============================
    // Other roles blocked
    // =============================
    return res.status(403).json({ message: "Access denied" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign Technician
exports.assignTechnician = async (req, res) => {
  try {
    const { technicianId } = req.body;

    const complaint = await Complaint.findById(req.params.id);

    if (!complaint) {
      return res.status(404).json({ message: "Complaint not found" });
    }

    complaint.assignedTo = technicianId;

    await complaint.save();

    res.json({ message: "Technician assigned successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};