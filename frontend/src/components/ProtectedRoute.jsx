// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { normalizeRole, roleToDashboard } from "../lib/roles";

export default function ProtectedRoute({ allowed, children }) {
  const { user } = useAuth();

  // Not logged in -> go sign in
  if (!user) return <Navigate to="/signin" replace />;

  const role = normalizeRole(user.role);
  const allowList = (allowed || []).map(normalizeRole);

  // If allowed prop is provided and role isn't allowed -> send user to their dashboard
  if (allowList.length && !allowList.includes(role)) {
    return <Navigate to={roleToDashboard(role)} replace />;
  }

  return children;
}
