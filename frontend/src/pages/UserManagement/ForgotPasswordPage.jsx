import React, { useState } from "react";
import "../../styles/UserManagement/AuthForms.css";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { requestPasswordReset } from "../../api/userManagement";
import { useNavigate } from "react-router-dom";
import homeimg from "../../assets/images/homeimg.png";

export default function ForgotPasswordPage() {
  const [identifier, setIdentifier] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    setErr(""); 
    setMsg("");
    try {
      await requestPasswordReset(identifier);
      // ✅ Update success message
      setMsg("Email sent successfully!");
      navigate("/otp-validation", { state: { identifier } });
    } catch (ex) {
      setErr(ex.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="auth-bg">
        <img src={homeimg} alt="Forgot Password" className="auth__img" />
        <div className="auth-overlay">
          <div className="auth-card">
            <h2>Forgot Password</h2>
            <p>Enter your email to receive OTP</p>
            {err && <div className="error">{err}</div>}
            {msg && <div className="success">{msg}</div>}

            <form onSubmit={onSubmit} className="auth-form">
              <input
                type="text"
                placeholder="Email or Phone"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                required
              />
              <button type="submit" className="auth-btn">Send OTP</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
