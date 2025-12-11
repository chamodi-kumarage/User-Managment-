import React from "react";
import { Outlet } from "react-router-dom";
import QualityInspectorSideBar from "../../components/layout/qualityInspectorSideBar.jsx";

export default function QualityLayout() {
  return (
    <div style={{ display: "flex" }}>
      <QualityInspectorSideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
