import React from "react";
import { Outlet } from "react-router-dom";
import CustomerSideBar from "../../components/layout/customerSideBar.jsx";

export default function CustomerLayout() {
  return (
    <div style={{ display: "flex" }}>
      <CustomerSideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
