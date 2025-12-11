// frontend/src/components/layout/QualityLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import QualityInspectorSideBar from "./qualityInspectorSideBar";
import NavbarDark from "./NavbarDark";
import FooterDark from "./FooterDark";

export default function QualityLayout() {
  return (
    <div className="appShell" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top navbar */}
      <NavbarDark />

      {/* Middle area: sidebar + page content */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", flex: 1 }}>
        <QualityInspectorSideBar />
        <main className="appShell__content" style={{ padding: "16px 24px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>

      {/* Bottom footer */}
      <FooterDark />
    </div>
  );
}
