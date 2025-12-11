import React from "react";  
import { NavLink } from "react-router-dom";
import "../../styles/Common/deliverySideBar.css";
import SidebarLogout from "./SidebarLogout";

const Icon = ({ path, viewBox = "0 0 24 24" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox={viewBox} className="asb__icon" aria-hidden="true" focusable="false">
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


const icons = {
  dashboard:"M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z",
  bell:"M12 22a2 2 0 0 0 2-2h-4a2 2 0 0 0 2 2zm6-6V11a6 6 0 1 0-12 0v5l-2 2v2h18v-2l-2-2z",
  profile:"M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-3.33 0-10 1.67-10 5v3h20v-3c0-3.33-6.67-5-10-5z",
  assigned:"M16 11c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3zm-8 0c1.66 0 3-1.34 3-3S9.66 5 8 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5C15 14.17 10.33 13 8 13zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.96 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z",
  status:"M9 16.17 4.83 12 3.41 13.41 9 19l12-12-1.41-1.41z",
  confirm:"M5 4h14a2 2 0 0 1 2 2v12l-4-3-4 3-4-3-4 3V6a2 2 0 0 1 2-2z",
  history:"M13 3a9 9 0 1 0 9 9h-2a7 7 0 1 1-7-7v4l5-5-5-5v4z",
  route:"M12 2C9.24 2 7 4.24 7 7c0 4.5 5 9 5 9s5-4.5 5-9c0-2.76-2.24-5-5-5zm0 6.5A1.5 1.5 0 1 1 12 5a1.5 1.5 0 0 1 0 3.5zM5 20c0-2.21 3.58-3.5 7-3.5 1.71 0 3.33.26 4.67.74l1.1-1.93C15.95 14.68 14.1 14 12 14 7.58 14 3 15.79 3 20h2z",
  calendar:"M7 2v2H5a2 2 0 0 0-2 2v11a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2V2h-2v2H9V2H7zm12 6H5v9h14V8z",
  statistics:"M5 9h3v11H5V9zm5-4h3v15h-3V5zm5 7h3v8h-3v-8z",
  report:"M14 2H6a2 2 0 0 0-2 2v16l6-3 6 3V8m0-6v6h6",
  // NEW: list icon for "All Deliveries"
  allList:"M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z",
};

export default function DeliverySideBar() {
  return (
    <aside className="asb__wrapper dsb__theme">
      <div className="asb__brand">
        <div className="asb__brandLogo">🚚</div>
        <div className="asb__brandText">
          <h1>Delivery Staff</h1>
          <p>Staff Portal</p>
        </div>
      </div>

      <nav className="asb__nav">
        <ul className="asb__top">
          <Item to="/delivery/dashboard" icon={icons.dashboard} label="Delivery Dashboard" />
        </ul>

        <div className="asb__section">
          <div className="asb__sectionTitle">My Work</div>
          <ul className="asb__list">
            {/* NEW: All Deliveries */}
            <Item to="/delivery/all-deliveries" icon={icons.allList} label="All Deliveries" />

            <Item to="/delivery/my-deliveries#assigned" icon={icons.assigned} label="Assigned Deliveries" />
            <Item to="/delivery/status-update" icon={icons.status} label="Delivery Status Update" />
            <Item to="/delivery/delivery-confirmation" icon={icons.confirm} label="Delivery Confirmation" />
            <Item to="/delivery/generate-report" icon={icons.report} label="Generate Report" />
            <Item to="/delivery/delivery-history" icon={icons.history} label="Delivery History" />
            <Item to="/delivery/statistics" icon={icons.statistics} label="Delivery Statistics" />
            <Item to="/delivery/schedule-route" icon={icons.route} label="Schedule Route" />
            <Item to="/delivery/my-schedule" icon={icons.calendar} label="My Schedules" />
          </ul>
        </div>

        <div className="asb__section">
          <div className="asb__sectionTitle">Account</div>
          <ul className="asb__list">
            <Item to="/delivery/notifications" icon={icons.bell} label="Notifications" />
            <Item to="/delivery/profile" icon={icons.profile} label="Profile & Settings" />
          </ul>
        </div>
      </nav>

      <SidebarLogout />
    </aside>
  );
}
