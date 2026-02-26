import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ComplaintForm from "./pages/ComplaintForm";
import AdminDashboard from "./pages/AdminDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layout/MainLayout";
import { Toaster } from "react-hot-toast";
import TechnicianDashboard from "./pages/TechnicianDashboard";
import HomePage from "./pages/HomePage";


function App() {
  return (
    <Router>

            {/* ✅ Toast Component Added Here */}
      <Toaster position="top-right" /> 

      <Routes>
        <Route path="/" element={<HomePage />} />

        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminDashboard />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/complaint"
          element={
            <ProtectedRoute>
              <MainLayout>
                <ComplaintForm />
              </MainLayout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <MainLayout>
                <AdminDashboard />
              </MainLayout>
            </ProtectedRoute>
          }
        />

<Route
  path="/technician"
  element={
    <ProtectedRoute>
      <TechnicianDashboard />
    </ProtectedRoute>
  }
/>

      </Routes>
    </Router>
  );
}

export default App;