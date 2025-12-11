import React from "react";
import { Outlet } from "react-router-dom";
import ProductionSideBar from "../../components/layout/productionSideBar.jsx";

export default function ProductionLayout() {
  return (
    <div style={{ display: "flex", backgroundColor: "#f0f2f5", minHeight: "100vh" }}> {/* Added background color and minHeight */}
      <ProductionSideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
