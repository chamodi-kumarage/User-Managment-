// frontend/src/components/layout/productionSideBar.jsx
import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Common/productionSideBar.css";
import SidebarLogout from "./SidebarLogout";

// inline icon helper (same pattern as your admin sidebar)
const Icon = ({ path, viewBox = "24 24" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${viewBox}`} className="asb__icon" aria-hidden="true">
    <path d={path} />
  </svg>
);

// icon set
const icons = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  inventory: "M4 4h16v2H4V4zm0 6h16v2H4v-2zm0 6h16v2H4v-2z",
  add: "M11 11V6h2v5h5v2h-5v5h-2v-5H6v-2h5z",
  production: "M12 2l4 4-7 7-2 5 5-2 7-7 4 4-8 8-8 3 3-8 8-8z",
  summary: "M3 5h18v2H3V5zm0 6h12v2H3v-2zm0 6h8v2H3v-2z",
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
    <NavLink to={to} className={({ isActive }) => `asb__link ${isActive ? "asb__link--active" : ""}`}>
      <Icon path={icon} />
      <span>{label}</span>
    </NavLink>
  </li>
);

export default function ProductionSideBar() {
  return (
    <aside className="asb__wrapper psb__theme">
      <div className="asb__brand">
        <div className="asb__brandLogo">🥥</div>
        <div className="asb__brandText">
          <h1>Production Staff</h1>
          <p>Operations Portal</p>
        </div>
      </div>

      <nav className="asb__nav">
        {/* Top link */}
        <ul className="asb__top">
          <Item to="/production/dashboard" icon={icons.dashboard} label="Dashboard" />
        </ul>

        {/* Inventory Management (from his app) */}
        <Section title="Inventory Management">
          <Item to="/production/inventory" icon={icons.inventory} label="View Inventory" />
          <Item to="/production/inventory/add" icon={icons.add} label="Add Inventory" />
        </Section>

        {/* Production Management (from his app) */}
        <Section title="Production Management">
          <Item to="/production/production" icon={icons.production} label="View Productions" />
          <Item to="/production/production/add" icon={icons.add} label="Add Production" />
        </Section>

        {/* Your existing pages — keep these untouched */}
        <Section title="Dashboard Tools">
          <Item to="/production/profile" icon={icons.profile} label="Profile & Settings" />
        </Section>
      </nav>

      {/* keep your existing logout component */}
      <SidebarLogout />
    </aside>
  );
}
