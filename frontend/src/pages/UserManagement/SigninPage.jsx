import React, { useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "../../styles/UserManagement/SignupPage.css";
import "../../styles/UserManagement/SigninForm.css";
import logimg from "../../assets/images/logimg.mp4";
import { useAuth } from "../../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { roleToDashboard } from "../../lib/roles";   

export default function SigninPage() {
  const { signin } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  async function onSubmit(e) {
    e.preventDefault();
    setErr("");
    try {
      const data = await signin(email, password);
      const role = data.role ?? "CUSTOMER";
      // rule: CUSTOMER -> home, others -> dashboards
      if (role === "CUSTOMER") navigate("/", { replace: true });
      else navigate(roleToDashboard(role), { replace: true });
    } catch (ex) {
      setErr(ex.message || "Failed to sign in");
    }
  }

  return (
    <>
      <Navbar />
      <div className="signup-wrapper">
        <div className="signup-left">
          <video src={logimg} autoPlay loop muted className="auth__video" />
        </div>

        <div className="signup-right signin-right">
          <h2>Welcome Back</h2>
          <p>Login to continue.</p>

          {err && <div className="error-banner">{err}</div>}

          <form className="signin-form" onSubmit={onSubmit}>
            <div className="input-group">
              <i className="bx bx-envelope"></i>
              <input type="email" placeholder="Email" required
                value={email} onChange={(e)=>setEmail(e.target.value)} />
            </div>

            <div className="input-group">
              <i className="bx bx-lock"></i>
              <input type="password" placeholder="Password" required
                value={password} onChange={(e)=>setPassword(e.target.value)} />
            </div>

            <button type="submit" className="signin-btn">Login</button>
              <p className="signin-footer">
                Don’t have an account? <Link to="/signup">Register here</Link>
              </p>
              <p className="signin-footer">
                <Link to="/forgot-password">Forgot password?</Link>
              </p>

          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
