import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserShield, FaTools, FaClipboardList } from "react-icons/fa";
import logo from "../assets/logo.png";
import hero from "../assets/hero.jpg";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">

      {/* NAVBAR */}
      <div className="bg-gradient-to-r from-black to-gray-900 text-white p-4 flex justify-between items-center shadow-xl">
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="College Logo"
            className="h-12 w-12 object-contain bg-white rounded-full p-1 shadow"
          />
          <h1 className="text-sm md:text-lg font-semibold tracking-wide">
            B.P. PODDAR INSTITUTE OF MANAGEMENT AND TECHNOLOGY
          </h1>
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-yellow-500 text-black px-5 py-2 rounded-lg font-semibold hover:bg-yellow-400 hover:scale-105 transition duration-300 shadow-lg"
        >
          Login
        </button>
      </div>

      {/* HERO SECTION */}
      <div
        className="relative flex flex-col items-center justify-center text-center py-36 px-6 text-white"
        style={{
          backgroundImage: `url(${hero})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-75"></div>

        {/* Glass Content */}
        <div className="relative z-10 max-w-3xl backdrop-blur-md bg-white/10 p-10 rounded-2xl shadow-2xl border border-yellow-500/30">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-yellow-400">
            College Complaint Management System
          </h2>

          <p className="text-lg mb-8 text-gray-200">
            A modern digital platform for students and staff to report,
            track, and resolve infrastructure and technical issues efficiently.
          </p>

          <button
            onClick={() => navigate("/login")}
            className="bg-yellow-500 text-black px-8 py-3 rounded-lg text-lg font-semibold hover:bg-yellow-400 hover:scale-105 transition duration-300 shadow-lg"
          >
            File a Complaint
          </button>
        </div>
      </div>

      {/* HOW IT WORKS */}
      <div className="bg-gray-100 py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-14 text-gray-900">
          How It Works
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
            <FaUserShield className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-3">Secure Login</h4>
            <p className="text-gray-600">
              Students and staff log in securely to access the complaint portal.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
            <FaClipboardList className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-3">Submit Complaint</h4>
            <p className="text-gray-600">
              Provide issue details and submit complaints digitally in seconds.
            </p>
          </div>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition duration-300 text-center">
            <FaTools className="text-yellow-500 text-4xl mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-3">Quick Resolution</h4>
            <p className="text-gray-600">
              Admin assigns technicians and ensures faster issue resolution.
            </p>
          </div>

        </div>
      </div>

      {/* WHY USE SYSTEM */}
      <div className="bg-white py-20 px-6">
        <h3 className="text-3xl font-bold text-center mb-14 text-gray-900">
          Why Use This System?
        </h3>

        <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto">

          <div className="p-6 text-center">
            <h4 className="font-semibold text-lg mb-2 text-yellow-600">
              ✔ Easy Reporting
            </h4>
            <p className="text-gray-600">
              Submit complaints quickly without paperwork.
            </p>
          </div>

          <div className="p-6 text-center">
            <h4 className="font-semibold text-lg mb-2 text-yellow-600">
              ✔ Transparent Tracking
            </h4>
            <p className="text-gray-600">
              Track complaint status from submission to resolution.
            </p>
          </div>

          <div className="p-6 text-center">
            <h4 className="font-semibold text-lg mb-2 text-yellow-600">
              ✔ Faster Resolution
            </h4>
            <p className="text-gray-600">
              Efficient assignment ensures quick problem solving.
            </p>
          </div>

        </div>
      </div>

      {/* FOOTER */}
      <div className="bg-black text-white text-center p-8 mt-auto">
        <p className="font-semibold text-lg mb-2 text-yellow-400">
          B.P. PODDAR INSTITUTE OF MANAGEMENT AND TECHNOLOGY
        </p>

        <p className="text-sm text-gray-300">
          137, VIP Rd, Mali Bagan, Poodar Vihar, Rajarhat, Kolkata, West Bengal 700052
        </p>

        <p className="text-sm mt-2 text-gray-300">
          Contact: +91 98364 36999
        </p>

        <p className="text-xs mt-4 text-gray-500">
          © 2026 BPPIMT | Complaint Management System
        </p>
      </div>

    </div>
  );
}

export default HomePage;