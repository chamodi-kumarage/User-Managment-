import React from "react";
import { NavLink } from "react-router-dom";
import "../../styles/Common/adminSideBar.css";
import SidebarLogout from "./SidebarLogout";

// small SVG helper
const Icon = ({ path, viewBox = "24 24" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={`0 0 ${viewBox}`} className="asb__icon" aria-hidden="true">
    <path d={path} />
  </svg>
);

const Item = ({ to, icon, label }) => (
  <li>
    <NavLink
      to={to}
      className={({ isActive }) => `asb__link ${isActive ? "asb__link--active" : ""}`}
      style={({ isActive }) => (isActive ? { color: "#000" } : undefined)}   // ← inline color for chosen item
      end={to === "/quality/dashboard"}
    >
      <Icon path={icon} />
      <span>{label}</span>
    </NavLink>
  </li>
);


const Section = ({ title, children }) => (
  <div className="asb__section">
    <div className="asb__sectionTitle">{title}</div>
    <ul className="asb__list">{children}</ul>
  </div>
);

// icons
const icons = {
  dashboard: "M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  products: "M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z",
  measurement: "M3 17h18v2H3v-2zm0-7h18v2H3v-2zm0-7h18v2H3V3z",
  results: "M5 3h14v18H5zM7 7h10v2H7V7zm0 4h10v2H7v-2zm0 4h6v2H7v-2z",
  charts: "M3 13h4v8H3v-8zm7-6h4v14h-4V7zm7 4h4v10h-4V11z",
  projects: "M4 20h16v-2H4v2zm2-4h12v-2H6v2zm0-4h12V10H6v2zm0-6v2h12V6H6z",
  standards: "M4 7h16v2H4V7zm0 5h12v2H4v-2zm0 5h8v2H4v-2z",
  autoApproval: "M12 2a10 10 0 1 0 10 10h-2A8 8 0 1 1 12 4V2l4 4-4 4V7a5 5 0 1 0 5 5h2A7 7 0 1 1 12 5",
  complaints: "M12 3a9 9 0 1 0 9 9H19a7 7 0 1 1-7-7V3l4 4-4 4V7a5 5 0 1 0 5 5h2a7 7 0 1 1-7-7z",
  schedules: "M19 4h-1V2h-2v2H8V2H6v2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zM5 20V9h14v11H5z",
  bell: "M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5L4 18v2h16v-2l-2-2z",
  profile: "M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-4.67-3.5-7-3.5z",
  certificate: "M12 2l3 6 6 1-4.5 4.3L18 20l-6-3.2L6 20l1.5-6.7L3 9l6-1 3-6z",
  mail: "M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4-8 5-8-5V6l8 5 8-5v2z"
};

export default function QualityInspectorSideBar() {
  return (
    <aside className="asb__wrapper qis__theme">
      {/* Brand */}
      <div className="asb__brand">
        <div className="asb__brandLogo">🧪</div>
        <div className="asb__brandText">
          <h1>Quality Inspector</h1>
          <p>Quality Portal</p>
        </div>
      </div>

      <nav className="asb__nav">
        <ul className="asb__top">
          <Item to="/quality/dashboard" icon={icons.dashboard} label="Dashboard" />
        </ul>

        <Section title="Quality Tests">
          <Item to="/quality/products" icon={icons.products} label="Product Table" />
          <Item to="/quality/measurements" icon={icons.measurement} label="Enter Measurements" />
          <Item to="/quality/results" icon={icons.results} label="Test Results" />
          <Item to="/quality/certificates" icon={icons.certificate} label="Certificates" />
          <Item to="/quality/charts" icon={icons.charts} label="Result Charts" />
          <Item to="/quality/projects" icon={icons.projects} label="Improvement Projects" />
          <Item to="/quality/standards-hub" icon={icons.standards} label="Standards & Specs" />
          <Item to="/quality/auto-approval" icon={icons.autoApproval} label="Auto-Approval" />
        </Section>

        <Section title="Feedback & Reply">
          {/* NEW: QUALITY feedback list */}
          <Item to="/quality/feedback" icon={icons.mail} label="User Complaints" />
        </Section>

        <Section title="Account">
          <Item to="/quality/notifications" icon={icons.bell} label="Notifications" />
          <Item to="/quality/profile" icon={icons.profile} label="Profile & Settings" />
        </Section>
      </nav>

      <SidebarLogout />
    </aside>
  );
}
