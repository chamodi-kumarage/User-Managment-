import React from "react";
import { Outlet } from "react-router-dom";
import DeliverySideBar from "../../components/layout/deliverySideBar.jsx";

export default function DeliveryLayout() {
  return (
    <div style={{ display: "flex" }}>
      <DeliverySideBar />
      <div style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </div>
    </div>
  );
}
