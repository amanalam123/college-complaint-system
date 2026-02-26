import React, { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

function TechnicianDashboard() {
  const [complaints, setComplaints] = useState([]);
// const userName = localStorage.getItem("name");
const [user, setUser] = useState(null);

  const fetchAssignedComplaints = async () => {
    const token = localStorage.getItem("token");

    try {
      const res = await axios.get(
        "http://localhost:5000/api/complaints/technician",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setComplaints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const markResolved = async (id) => {
    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:5000/api/complaints/${id}/status`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAssignedComplaints();
    } catch (error) {
      console.log(error);
    }
  };

 useEffect(() => {
  fetchAssignedComplaints();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  if (storedUser) {
    setUser(storedUser);
  }
}, []);

return (
  <div className="flex min-h-screen bg-gray-100">

    {/* Sidebar */}
    <Sidebar />

    {/* Main Section */}
    <div className="flex-1 flex flex-col">

      {/* Top Navbar */}
      <div className="bg-white border-b px-8 py-4 flex justify-between items-center">

        <h2 className="text-xl font-semibold text-gray-800">
          Technician Dashboard
        </h2>

        <div className="flex items-center gap-6">

          <input
            type="text"
            placeholder="Search..."
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />

          <div className="flex items-center gap-3">
            <span className="text-gray-600 text-sm">
              Hi, {user ? user.name : "Technician"}
            </span>
            <div className="w-9 h-9 bg-purple-600 text-white flex items-center justify-center rounded-full font-semibold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>

        </div>
      </div>

      {/* Page Content */}
      <div className="p-8">

        <h3 className="text-xl font-semibold mb-6">
          Assigned Complaints
        </h3>

        {complaints.length === 0 ? (
          <p className="text-gray-500">
            No assigned complaints
          </p>
        ) : (
          complaints.map((comp) => (
            <div
              key={comp._id}
              className="bg-white p-6 rounded-xl shadow mb-6"
            >
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
                      : "bg-yellow-100 text-yellow-600"
                  }`}
                >
                  {comp.status}
                </span>
              </div>

              {comp.status === "Pending" && (
                <button
                  onClick={() => markResolved(comp._id)}
                  className="mt-4 bg-green-500 text-white px-5 py-2 rounded-lg hover:bg-green-600 transition"
                >
                  Mark Resolved
                </button>
              )}
            </div>
          ))
        )}

      </div>
    </div>
  </div>
);
}

export default TechnicianDashboard;