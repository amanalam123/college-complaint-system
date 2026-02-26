import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const base =
    "flex items-center gap-3 px-4 py-3 rounded-lg transition duration-200";

  const active =
    "bg-blue-600 text-white shadow";

  const inactive =
    "text-gray-300 hover:bg-slate-700 hover:text-white";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <div className="w-64 bg-slate-800 text-white min-h-screen p-6 flex flex-col shadow-xl">

      <h1 className="text-2xl font-bold mb-10 tracking-wide">
        ComplaintSys
      </h1>

      <nav className="flex flex-col space-y-3">

        <NavLink
          to={
            role === "admin"
              ? "/admin"
              : role === "technician"
              ? "/technician"
              : "/dashboard"
          }
          className={({ isActive }) =>
            `${base} ${isActive ? active : inactive}`
          }
        >
          <LayoutDashboard size={18} />
          Dashboard
        </NavLink>

        {role === "admin" && (
          <NavLink
            to="/admin"
            className={({ isActive }) =>
              `${base} ${isActive ? active : inactive}`
            }
          >
            <FileText size={18} />
            Manage Complaints
          </NavLink>
        )}

      </nav>

      <div className="mt-auto pt-6">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-red-600 hover:bg-red-700 transition"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;