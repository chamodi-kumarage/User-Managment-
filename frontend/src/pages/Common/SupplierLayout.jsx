import React from "react";
import { Outlet } from "react-router-dom";
import SupplierSideBar from "../../components/layout/supplierSideBar.jsx";

export default function SupplierLayout() {
  return (
    <div style={{ display: "flex" }}>
      <SupplierSideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
