import React from "react";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import "../../styles/Common/sidebarLogout.css"; // dedicated CSS

// same Icon helper pattern used in sidebars
const Icon = ({ path, viewBox = "0 0 24 24" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox={viewBox}
    className="asb__icon"
    aria-hidden="true"
  >
    <path d={path} fill="currentColor" />
  </svg>
);

// logout icon (door with arrow)
const logoutIcon =
  "M16 13v-2H7V8l-5 4 5 4v-3h9zm3-10H9c-1.1 0-2 .9-2 2v4h2V5h10v14H9v-4H7v4c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z";

export default function SidebarLogout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/signin", { replace: true });
  }

  return (
    <div className="asb__logout">
      <button className="asb__logoutBtn" onClick={handleLogout}>
        <Icon path={logoutIcon} />
        <span>Logout</span>
      </button>
    </div>
  );
}
