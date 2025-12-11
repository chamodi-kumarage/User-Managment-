import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Common/adminSideBar.css";
import SidebarLogout from "./SidebarLogout";

/**
 * Shop Owner Sidebar (Admin)
 */

const Icon = ({ path, viewBox = "24 24" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={`0 0 ${viewBox}`}
    className="asb__icon"
    aria-hidden="true"
    focusable="false"
  >
    <path d={path} />
  </svg>
);

// Minimal icon set (material-esque paths)
const icons = {
  dashboard:
    "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  suppliers:
    "M12 12c2.21 0 4-1.79 4-4S14.21 4 12 4 8 5.79 8 8s1.79 4 4 4zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z",
  orders:
    "M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-1.99.9-1.99 2S15.9 22 17 22s2-.9 2-2-.9-2-2-2zM7 6h13l-1.4 7H8.53L7 6zm-2 0H2V4h3l3.6 7.59-1.35 2.45C6.84 14.68 7 15 7 15h12v2H7c-1.66 0-3-1.34-3-3V6z",
  bids:
    "M20 2H4c-1.1 0-2 .9-2 2v12l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z",
  reports:
    "M14 2H6a2 2 0 0 0-2 2v16l6-3 6 3V8m0-6v6h6",
  status:
    "M12 2a10 10 0 1 0 .001 20.001A10 10 0 0 0 12 2zm1 5h-2v7h6v-2h-4V7z",
  stock:
    "M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h16v2H4v-2z",
  alert:
    "M1 21h22L12 2 1 21zm12-3h-2v2h2v-2zm0-6h-2v4h2v-4z",
  finance:
    "M3 17h2v2H3v-2zm0-4h2v3H3v-3zm0-4h2v3H3V9zm4 8h2v2H7v-2zm0-6h2v6H7v-6zm4 3h2v5h-2v-5zm4-6h2v11h-2V8zm4-4h2v15h-2V4z",
  invoice:
    "M8 2h8l4 4v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm8 5V3.5L19.5 7H16z",
  profit:
    "M3 17h18v2H3v-2zm2-8l4 4 3-3 5 5 3-3v5H5V9z",
  delivery:
    "M3 6h11v12H3V6zm12 3h3l3 3v6h-6V9zM6 9h5v2H6V9z",
  tracking:
    "M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z",
  assign:
    "M12 12c2.76 0 5-2.24 5-5S14.76 2 12 2 7 4.24 7 7s2.24 5 5 5zm-7 8v-1c0-2.21 3.58-3.5 7-3.5s7 1.29 7 3.5v1H5z",
  analytics:
    "M3 3h2v18H3V3zm4 10h2v8H7v-8zm4-6h2v14h-2V7zm4 4h2v10h-2V11zm4-8h2v18h-2V3z",
  settings:
    "M19.14 12.94a7.96 7.96 0 0 0 .06-1 7.96 7.96 0 0 0-.06-1l2.03-1.58a.5.5 0 0 0 .12-.64l-1.92-3.32a.5.5 0 0 0-.6-.22l-2.39.96a7.99 7.99 0 0 0-1.73-1l-.36-2.54A.5.5 0 0 0 12 0h-4a.5.5 0 0 0-.5.42L7.14 2.96c-.62.26-1.2.6-1.73 1l-2.39-.96a.5.5 0 0 0-.6.22L.5 6.54a.5.5 0 0 0 .12.64L2.65 8.76c-.04.33-.06.66-.06 1s.02.67.06 1L.62 12.34a.5.5 0 0 0-.12.64l1.92 3.32c.14.24.43.34.69.22l2.39-.96c.53.4 1.11.74 1.73 1l.36 2.54c.04.25.25.42.5.42h4c.25 0 .46-.17.5-.42l.36-2.54c.62-.26 1.2-.6 1.73-1l2.39.96c.26.12.55.02.69-.22l1.92-3.32a.5.5 0 0 0-.12-.64l-2.03-1.58zM10 14a4 4 0 1 1 0-8 4 4 0 0 1 0 8z",
  invoicesDoc:
    "M6 2h9l3 3v15a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm3 6h6v2H9V8zm0 4h6v2H9v-2z",
  users:
    "M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h8v-2.5c0-1.18 1.26-2.17 3-2.68-.94-.33-2-.5-4-.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.96 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  feedback:
    "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
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
      className={({ isActive }) => `asb__link ${isActive ? "asb__link--active" : ""}`}
      style={({ isActive }) => (isActive ? { color: "#000" } : undefined)}
      // Only the dashboard link should use "end"
      end={to === "/owner/dashboard"}
    >
      <Icon path={icon} />
      <span>{label}</span>
    </NavLink>
  </li>
);

const AdminSideBar = () => {
  return (
    <aside className="asb__wrapper">
      <div className="asb__brand">
        <div className="asb__brandLogo">🥥</div>
        <div className="asb__brandText">
          <h1>Coconut Oil Shop</h1>
          <p>Management System</p>
        </div>
      </div>

      <nav className="asb__nav">
        <ul className="asb__top">
          <Item to="/owner/dashboard" icon={icons.dashboard} label="Dashboard" />
        </ul>

        {/* Feedback Management (group) */}
        <Section title="Feedback Management">
          <Item to="/owner/feedback" icon={icons.feedback} label="All Feedbacks" />
        </Section>

        {/* User Management (group) */}
        <Section title="User Management">
          <Item to="/owner/user-management" icon={icons.users} label="Manage Users" />
          </Section>

        <Section title="Quality Management">
          
          <Item to="/owner/quality-statistics" icon={icons.analytics} label="Quality Statistics" />
          <Item to="/owner/test-results" icon={icons.reports} label="Test Results" />
        </Section>

        <Section title="Supplier Management">
          <Item to="/owner/suppliers" icon={icons.suppliers} label="Supplier Management" />
          <Item to="/owner/supply-orders" icon={icons.orders} label="Supply Orders" />
          <Item to="/owner/bids-approvals" icon={icons.bids} label="Bids & Approvals" />
          <Item to="/owner/supplier-reports" icon={icons.reports} label="Supplier Reports" />
        </Section>

        <Section title="Order Management">
          <Item to="/owner/customer-orders" icon={icons.orders} label="Customer Orders" />
          <Item to="/owner/order-status" icon={icons.status} label="Order Status" />
        </Section>

        <Section title="Inventory Management">
          <Item to="/owner/current-stock" icon={icons.stock} label="Current Stock" />
          <Item to="/owner/low-stock-alerts" icon={icons.alert} label="Low Stock Alerts" />
          <Item to="/owner/stock-reports" icon={icons.reports} label="Stock Reports" />
        </Section>

        {/* === Financial Management (group + your extra link) === */}
        <Section title="Financial Management">
          <Item to="/owner/sales-expenses" icon={icons.finance} label="Sales & Expenses" />
          <Item to="/owner/invoices" icon={icons.invoice} label="Customer Payments" />
          <Item to="/owner/financial-stats" icon={icons.analytics} label="Financial Stats" />
        </Section>

        {/* === Delivery Management (group + your extra links) === */}
        <Section title="Delivery Management">
          <Item to="/owner/assign-deliveries" icon={icons.assign} label="Assign Deliveries" />
          <Item to="/owner/delivery-tracking" icon={icons.tracking} label="Delivery Tracking" />
          <Item to="/owner/delivery-stat" icon={icons.analytics} label="Delivery Stat" />
          <Item to="/owner/notifications" icon={icons.alert} label="Notifications" />
        </Section>

        <Section title="Reports & Analytics">
          <Item to="/owner/supply-cost-reports" icon={icons.reports} label="Supply Cost Reports" />
          <Item to="/owner/supplier-performance" icon={icons.analytics} label="Supplier Performance" />
          <Item to="/owner/inventory-financial-reports" icon={icons.reports} label="Inventory & Financial Reports" />
        </Section>

        <Section title="User & Account Settings">
          <Item to="/owner/settings" icon={icons.settings} label="Profile & Settings" />
        </Section>
      </nav>

      <SidebarLogout />
    </aside>
  );
};

export default AdminSideBar;
