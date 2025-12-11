import React, { useState } from "react";
import "../../styles/UserManagement/AuthForms.css";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { verifyOtp } from "../../api/userManagement";
import homeimg from "../../assets/images/homeimg.png";

export default function OtpValidationPage() {
  const [otp, setOtp] = useState("");
  const [err, setErr] = useState("");
  const navigate = useNavigate();
  const { state } = useLocation();
  const identifier = state?.identifier;

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      await verifyOtp(identifier, otp);
      navigate("/reset-password", { state: { identifier } });
    } catch (ex) {
      setErr(ex.message);
    }
  }

  return (
    <>
      <Navbar />
      <div className="auth-bg">
        <img src={homeimg} alt="OTP Validation" className="auth__img" />
        <div className="auth-overlay">
          <div className="auth-card">
            <h2>OTP Verification</h2>
            <p>Enter the OTP sent to your email/phone</p>
            {err && <div className="error">{err}</div>}

            <form onSubmit={onSubmit} className="auth-form">
              <input
                type="text"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
              />
              <button type="submit" className="auth-btn">Verify OTP</button>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
