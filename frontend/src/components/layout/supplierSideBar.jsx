import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Common/supplierSideBar.css"; // <-- uses its own CSS (which reuses admin styles)
import SidebarLogout from "./SidebarLogout";


/**
 * Coconut Supplier Sidebar
 * - Reuses the same look as admin sidebar via CSS import
 * - Keeps active highlighting with NavLink
 * - Safe: does NOT modify your admin sidebar files
 */

const Icon = ({ path, viewBox = "24 24" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${viewBox}`}
    className="asb__icon"
    aria-hidden="true"
  >
    <path d={path} />
  </svg>
);

// simple icon set (same style as owner)
const icons = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  orders: "M7 6h13l-1.4 7H8.53L7 6zM5 6H2V4h3l3.6 7.59-1.35 2.45c-.41.64-.25.96-.25.96H19v2H7c-1.66 0-3-1.34-3-3V6z",
  bids: "M20 2H4a2 2 0 0 0-2 2v12l4-4h14a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z",
  history: "M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7V3l4 4-4 4V8a5 5 0 1 0 5 5h2a7 7 0 1 1-7-7",
  tracking: "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  payments: "M21 7H3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h18a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2zm-2 7H5v-2h14v2z",
  bell: "M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5L4 18v2h16v-2l-2-2z",
  profile: "M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z",
};

const Section = ({ title, children }) => (
  <div className="asb__section">
    <div className="asb__sectionTitle">{title}</div>
    <ul className="asb__list">{children}</ul>
  </div>
);

const Item = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) =>
        `asb__link ${isActive ? "asb__link--active" : ""}`
      }
    >
      <Icon path={icon} />
      <span>{label}</span>
    </NavLink>
  </li>
);

export default function SupplierSideBar() {
  return (
    <aside className="asb__wrapper ssb__theme">
      <div className="asb__brand">
        <div className="asb__brandLogo">🥥</div>
        <div className="asb__brandText">
          <h1>Coconut Supplier</h1>
          <p>Partner Portal</p>
        </div>
      </div>

      <nav className="asb__nav">
        <ul className="asb__top">
          <Item to="/supplier/dashboard" icon={icons.dashboard} label="Dashboard" />
        </ul>

        <Section title="Supply Operations">
          <Item to="/supplier/supply-orders" icon={icons.orders} label="Supply Orders" />
          <Item to="/supplier/my-bids" icon={icons.bids} label="My Bids" />
          <Item to="/supplier/bid-history" icon={icons.history} label="Bid History & Status" />
          <Item to="/supplier/delivery-tracking" icon={icons.tracking} label="Delivery Tracking" />
        </Section>

        <Section title="Finance & Notifications">
          <Item to="/supplier/payments" icon={icons.payments} label="Payments" />
          <Item to="/supplier/notifications" icon={icons.bell} label="Notifications" />
        </Section>

        <Section title="Account">
          <Item to="/supplier/profile" icon={icons.profile} label="Profile & Settings" />
        </Section>
      </nav>
      <SidebarLogout />

    </aside>
  );
}
