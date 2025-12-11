import React, { useState } from "react";
import "../../styles/UserManagement/AuthForms.css";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { resetPassword } from "../../api/userManagement";
import homeimg from "../../assets/images/homeimg.png";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const identifier = state?.identifier;

  async function onSubmit(e) {
    e.preventDefault();
    if (password !== confirm) { setErr("Passwords do not match"); return; }
    setErr("");
    try {
      await resetPassword(identifier, password);
      alert("Password reset successful! Please login.");
      navigate("/signin");
    } catch (ex) {
      setErr(ex.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="auth-bg">
        <img src={homeimg} alt="Reset Password" className="auth__img" />
        <div className="auth-overlay">
          <div className="auth-card">
            <h2>Reset Password</h2>
            {err && <div className="error">{err}</div>}
            <form onSubmit={onSubmit} className="auth-form">
              <input
                type="password"
                placeholder="New Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                required
              />
              <button type="submit" className="auth-btn">Update Password</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
