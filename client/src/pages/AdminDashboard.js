import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function AdminDashboard() {
  const [complaints, setComplaints] = useState([]);
  const [technicians, setTechnicians] = useState([]);

  const userName = localStorage.getItem("name");
  const token = localStorage.getItem("token");

  // ================= FETCH COMPLAINTS =================
  const fetchComplaints = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/all",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setComplaints(res.data);
    } catch (error) {
      console.error("Error fetching complaints:", error?.response?.data || error.message);
    }
  }, [token]);

  // ================= FETCH TECHNICIANS =================
  const fetchTechnicians = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/users/technicians",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTechnicians(res.data);
    } catch (error) {
      console.error("Error fetching technicians:", error?.response?.data || error.message);
    }
  }, [token]);

  // ================= ASSIGN TECHNICIAN =================
  const assignTechnician = async (complaintId, technicianId) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${complaintId}/assign`,
        { technicianId },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComplaints();
    } catch (error) {
      console.error("Assign error:", error?.response?.data || error.message);
    }
  };

  // ================= REJECT =================
  const rejectComplaint = async (id) => {
    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}/status`,
        { status: "Rejected" },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      fetchComplaints();
    } catch (error) {
      console.error("Reject error:", error?.response?.data || error.message);
    }
  };

  // ================= LOAD DATA =================
  useEffect(() => {
    fetchComplaints();
    fetchTechnicians();
  }, [fetchComplaints, fetchTechnicians]);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-white border-b px-8 py-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-800">
            Admin Dashboard
          </h2>

          <div className="flex items-center gap-6">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
            />

            <div className="flex items-center gap-3">
              <span className="text-gray-600 text-sm">
                Hi, {userName}
              </span>
              <div className="w-9 h-9 bg-purple-600 text-white flex items-center justify-center rounded-full font-semibold">
                {userName?.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500 text-sm">Total Complaints</p>
              <h3 className="text-3xl font-bold text-purple-600">
                {complaints.length}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500 text-sm">Pending</p>
              <h3 className="text-3xl font-bold text-yellow-500">
                {complaints.filter(c => c.status === "Pending").length}
              </h3>
            </div>

            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-500 text-sm">Resolved</p>
              <h3 className="text-3xl font-bold text-green-500">
                {complaints.filter(c => c.status === "Resolved").length}
              </h3>
            </div>
          </div>

          {/* Complaint List */}
          <h3 className="text-xl font-semibold mb-4">
            All Complaints
          </h3>

          {complaints.map((comp) => (
            <div key={comp._id} className="bg-white p-6 rounded-xl shadow mb-6">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-semibold text-lg">
                    {comp.title}
                  </h4>
                  <p className="text-gray-500 mt-1">
                    {comp.description}
                  </p>
                </div>

                <span
                  className={`px-4 py-1 rounded-full text-sm ${
                    comp.status === "Resolved"
                      ? "bg-green-100 text-green-600"
                      : comp.status === "Rejected"
                      ? "bg-red-100 text-red-600"
                      : comp.status === "Assigned"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {comp.status}
                </span>
              </div>

              {comp.status === "Pending" && (
                <div className="mt-4 flex items-center gap-4">
                  <select
                    className="border px-4 py-2 rounded-lg"
                    defaultValue=""
                    onChange={(e) =>
                      assignTechnician(comp._id, e.target.value)
                    }
                  >
                    <option value="" disabled>
                      Select Technician
                    </option>
                    {technicians.map((tech) => (
                      <option key={tech._id} value={tech._id}>
                        {tech.name}
                      </option>
                    ))}
                  </select>

                  <button
                    onClick={() => rejectComplaint(comp._id)}
                    className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
                  >
                    Reject
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;