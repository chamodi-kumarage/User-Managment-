
import React from "react";
import { useAuth } from "../../context/AuthContext";

export default function DeliveryDashboard() {
  const { user } = useAuth();

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <main style={{ flex: 1, padding: "24px" }}>
        <h1>Delivery Dashboard</h1>
        {user && (
          <p style={{ color: "#666" }}>
            Signed in as <strong>{user.email}</strong> ({user.role})
          </p>
        )}
        {/* TODO: Delivery widgets */}
      </main>
    </div>
  );
}
