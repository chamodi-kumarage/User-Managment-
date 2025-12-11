import React from "react";
import { Outlet } from "react-router-dom";
import DeliverySideBar from "./deliverySideBar";
import NavbarDark from "./NavbarDark";
import FooterDark from "./FooterDark";

const wrap = {
  display: "grid",
  gridTemplateColumns: "280px 1fr",
  minHeight: "100vh",
  background: "#fffdf0",
};
const content = { padding: 16, overflow: "auto" };

export default function DeliveryLayout() {
  return (
    <div className="appShell" style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Top navbar */}
      <NavbarDark />

      {/* Middle area: sidebar + page content */}
      <div style={{ display: "grid", gridTemplateColumns: "280px 1fr", flex: 1 }}>
        <DeliverySideBar />
        <main className="appShell__content" style={{ padding: "16px 24px", overflowY: "auto" }}>
          <Outlet />
        </main>
      </div>

      {/* Bottom footer */}
      <FooterDark />
    </div>
  );
}



