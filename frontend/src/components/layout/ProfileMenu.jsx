// frontend/src/components/layout/ProfileMenu.jsx
import React, { useRef, useState, useEffect } from "react";
import "../../styles/Common/Home.css";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";

export default function ProfileMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    function onClickOutside(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    }
    window.addEventListener("click", onClickOutside);
    return () => window.removeEventListener("click", onClickOutside);
  }, []);

  const goDashboard = () => {
    // central entry; /dashboard will route by role
    navigate("/dashboard");
    setOpen(false);
  };

  const handleLogout = () => {
    logout();                 // clear context + token
    setOpen(false);           // close dropdown
    navigate("/", { replace: true }); // ✅ go Home after logout
  };

  return (
    <div className="profile" ref={ref}>
      <button
        className="profile__btn"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }}
        title="Account"
      >
        <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="8" r="4" />
          <path d="M4 20c0-4 4-6 8-6s8 2 8 6" />
        </svg>
      </button>

      {open && (
        <div className="profile__menu" role="menu" onClick={(e) => e.stopPropagation()}>
          {!user && (
            <>
              <Link to="/signin" role="menuitem" onClick={() => setOpen(false)}>Sign In</Link>
              <Link to="/signup" role="menuitem" onClick={() => setOpen(false)}>Sign Up</Link>
            </>
          )}
          {user && (
            <>
              <button role="menuitem" onClick={goDashboard} className="linklike">
                Dashboard
              </button>
              <button role="menuitem" onClick={handleLogout} className="linklike danger">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
