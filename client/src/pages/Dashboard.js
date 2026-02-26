import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";


function Dashboard() {
  const [complaints, setComplaints] = useState([]);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const fetchComplaints = async () => {
      const token = localStorage.getItem("token");

      try {
        const res = await axios.get(
          "http://localhost:5000/api/complaints/my",
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

    fetchComplaints();
  }, []);


return (
  <div>
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Welcome back 👋</p>
      </div>

      <div className="space-x-3">
        <Link to="/complaint">
          <button className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition">
            Submit Complaint
          </button>
        </Link>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>
    </div>

    {/* Stats Cards */}
    <div className="grid grid-cols-3 gap-6 mb-8">
      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-gray-500 text-sm">Total Complaints</h2>
        <p className="text-3xl font-bold mt-2 text-primary">
          {complaints.length}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-gray-500 text-sm">Pending</h2>
        <p className="text-3xl font-bold mt-2 text-yellow-500">
          {complaints.filter((c) => c.status === "Pending").length}
        </p>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border">
        <h2 className="text-gray-500 text-sm">Resolved</h2>
        <p className="text-3xl font-bold mt-2 text-green-500">
          {complaints.filter((c) => c.status === "Resolved").length}
        </p>
      </div>
    </div>


    {/* Complaints List */}
    <div>
      <h3 className="text-xl font-semibold mb-4">My Complaints</h3>

      {complaints.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow-sm border text-gray-500">
          No complaints submitted yet
        </div>
      ) : (
        <div className="space-y-4">
          {complaints.map((comp) => (
            <div
              key={comp._id}
              className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition"
            >
              <h4 className="text-lg font-semibold">{comp.title}</h4>
              <p className="text-gray-600 mt-2">{comp.description}</p>

              <div className="mt-3">
                <span
                  className={`px-3 py-1 text-sm rounded-full ${
                    comp.status === "Resolved"
                      ? "bg-green-100 text-green-700"
                      : comp.status === "Pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {comp.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  
  </div>

);

}

export default Dashboard;