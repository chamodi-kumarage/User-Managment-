import React from "react";
import { Outlet } from "react-router-dom";
import OwnerSideBar from "../../components/layout/OwnerSideBar.jsx";

export default function OwnerLayout() {
  return (
    <div style={{ display: "flex" }}>
      <OwnerSideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Nested routes will render here */}
        <Outlet />
      </div>
    </div>
  );
}
