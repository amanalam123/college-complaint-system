const mongoose = require("mongoose");

const complaintSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: {
      type: String,
      required: true
    },

    category: {
      type: String,
      enum: ["Academic", "Hostel", "Infrastructure", "Other"],
      default: "Other"
    },

    status: {
  type: String,
  enum: ["Pending", "Resolved", "Rejected"],
  default: "Pending"
},

assignedTo: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User"
},

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Complaint", complaintSchema);