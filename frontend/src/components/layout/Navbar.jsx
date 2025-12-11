// frontend/src/components/layout/Navbar.jsx
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../../styles/Common/Navbar.css";
import logo from "../../assets/images/logo.png";
import { useAuth } from "../../context/AuthContext";
import { roleToDashboard } from "../../lib/roles";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, logout } = useAuth(); // user: {email, role}

  function goToDashboard() {
    if (!user) return;
    if (user.role === "CUSTOMER") navigate("/", { replace: true });
    else navigate(roleToDashboard(user.role), { replace: true });
    setUserMenuOpen(false);
  }

  function handleLogout() {
    logout();                     // clear context + localStorage
    setUserMenuOpen(false);       // close dropdown
    navigate("/", { replace: true }); // ✅ go back to Home
  }

  return (
    <nav className="navbar">
      {/* Logo + Brand */}
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <img src={logo} alt="Uggalla Logo" className="logo-img" />
        <span>User Managment</span>
      </div>

      {/* Hamburger Menu for Mobile */}
      <div className="hamburger" onClick={() => setMenuOpen(!menuOpen)}>
        <span className="bar"></span>
        <span className="bar"></span>
        <span className="bar"></span>
      </div>

      {/* Navbar Links */}
      <ul className={`navbar-links ${menuOpen ? "active" : ""}`}>
        <li><Link to="/">Home</Link></li>
        <li><a href="/about">About Us</a></li>
        <li><Link to="/products">Products</Link></li>
        <li><a href="/contact">Contact</a></li>
        
      </ul>

      {/* Search + User Icon */}
      <div className="navbar-search">
        <input type="text" placeholder="Search..." />

        <div className="user-menu">
          {/* Inline SVG for user icon */}
          <button
            className="user-icon-btn"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
            title="Account"
          >
            <svg className="user-icon" width="22" height="22" viewBox="0 0 24 24">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
            </svg>
          </button>

          {userMenuOpen && (
            <div className="dropdown">
              {!user ? (
                <>
                  <Link to="/signup" onClick={() => setUserMenuOpen(false)}>Sign Up</Link>
                  <Link to="/signin" onClick={() => setUserMenuOpen(false)}>Sign In</Link>
                </>
              ) : (
                <>
                  <button className="dropdown__item" onClick={goToDashboard}>
                    Dashboard
                  </button>
                  <div className="dropdown__meta">
                    <div className="email">{user.email}</div>
                    <div className="role">{user.role}</div>
                  </div>
                  <button
                    className="dropdown__item danger"
                    onClick={handleLogout}   // ✅ call new handler
                  >
                    Sign Out
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
