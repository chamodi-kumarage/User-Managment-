import React from "react";
import { Outlet } from "react-router-dom";
import SupplierSideBar from "./supplierSideBar";

const wrap = {
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  minHeight: "100vh",
  background: "#fffdf0",
};
const content = { padding: 16, overflow: "auto" };

export default function SupplierLayout() {
  return (
    <div style={wrap}>
      <SupplierSideBar />
      <main style={content}>
        <Outlet />
      </main>
    </div>
  );
}
