import React from "react";
import { Outlet } from "react-router-dom";

import AdminSideBar from "./adminSideBar";
import NavbarDark from "./NavbarDark";
import FooterDark from "./FooterDark";

export default function OwnerLayout() {
  return (
    <div
      className="appShell"
      style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}
    >
      {/* Top navbar */}
      <NavbarDark />

      {/* Middle: sidebar + content */}
      <div
        style={{ display: "grid", gridTemplateColumns: "280px 1fr", flex: 1 }}
      >
        <AdminSideBar />
        <main
          className="appShell__content"
          style={{ padding: "16px 24px", overflowY: "auto" }}
        >
          <Outlet />
        </main>
      </div>

      {/* Bottom footer */}
      <FooterDark />
    </div>
  );
}
