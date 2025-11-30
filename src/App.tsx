import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import CustomerDashboard from "./pages/CustomerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import { useState, useEffect } from "react";
import type { Role } from "./types";

function App() {
  const [role, setRole] = useState<Role | null>(null);

  // Load role on refresh
  useEffect(() => {
    const saved = localStorage.getItem("role") as Role | null;
    if (saved) setRole(saved);
  }, []);

  function handleLogin(role: Role) {
    setRole(role);
    localStorage.setItem("role", role);
  }

  return (
    <Routes>
      <Route path="/login" element={<Login onLogin={handleLogin} />} />

      <Route
        path="/customer"
        element={
          role === "CUSTOMER" ? (
            <CustomerDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route
        path="/admin"
        element={
          role === "ADMIN" ? (
            <AdminDashboard />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
