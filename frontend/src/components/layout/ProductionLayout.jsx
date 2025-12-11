// frontend/src/components/layout/ProductionLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";

import ProductionSideBar from "./productionSideBar";
import NavbarDark from "./NavbarDark";
import FooterDark from "./FooterDark";

export default function ProductionLayout() {
  return (
    <div className="appShell" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top navbar */}
      <NavbarDark />

      {/* Sidebar + content */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", flex: 1 }}>
        <ProductionSideBar />
        <main className="appShell__content" style={{ padding: "16px 24px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>

      {/* Footer */}
      <FooterDark />
    </div>
  );
}
