import React, { useMemo, useState } from "react";
import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import "../../styles/UserManagement/SignupPage.css";
import "../../styles/UserManagement/SignupForm.css";
import logimg from "../../assets/images/logimg.mp4";
import { http } from "../../api/http";

const NAME_REGEX = /^[A-Za-z .'\u00C0-\u024F-]+$/; // letters + accents + common name chars
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\w\s]).{8,}$/;

export default function SignupPage() {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    address: "",
    email: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    dob: "",
    gender: "",
    role: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState("");

  // today minus 1 day (so you cannot pick "today")
  const maxDob = useMemo(() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return d.toISOString().slice(0, 10);
  }, []);

  /* ---------- per-field validators ---------- */
  function validateField(name, value) {
    switch (name) {
      case "firstName":
      case "lastName":
        if (!value.trim()) return "Required";
        if (!NAME_REGEX.test(value.trim())) return "Only letters, spaces, . and ' allowed";
        return "";
      case "address":
        if (!value.trim()) return "Required";
        return "";
      case "email":
        if (!value.trim()) return "Required";
        if (!EMAIL_REGEX.test(value.trim())) return "Invalid email format";
        return "";
      case "phoneNumber": {
        const v = value.replace(/\D/g, "");
        if (!v) return "Required";
        if (v.length < 10 || v.length > 15) return "Phone must be 10–15 digits";
        return "";
      }
      case "password":
        if (!value) return "Required";
        if (!PASSWORD_REGEX.test(value))
          return "Min 8 chars incl. upper, lower, number, special";
        return "";
      case "confirmPassword":
        if (!value) return "Required";
        if (value !== form.password) return "Passwords do not match";
        return "";
      case "dob":
        if (!value) return "Required";
        if (value >= maxDob) return "Birth date must be before today";
        return "";
      case "gender":
        if (!value) return "Required";
        return "";
      case "role":
        if (!value) return "Required";
        return "";
      default:
        return "";
    }
  }

  function validateAll(f) {
    const e = {};
    Object.keys(f).forEach((k) => {
      const err = validateField(k, f[k]);
      if (err) e[k] = err;
    });
    return e;
  }

  /* ---------- input handlers with gentle sanitization ---------- */
  function handleChange(e) {
    const { name, value } = e.target;

    // live sanitization for specific fields
    let next = value;
    if (name === "firstName" || name === "lastName") {
      // remove disallowed characters while typing
      next = value.replace(/[^A-Za-z .'\u00C0-\u024F-]/g, "");
    }
    if (name === "phoneNumber") {
      next = value.replace(/\D/g, ""); // digits only while typing
    }

    const updated = { ...form, [name]: next };
    setForm(updated);

    // live validate THIS field only
    const fieldErr = validateField(name, next);
    setErrors((prev) => ({ ...prev, [name]: fieldErr }));
  }

  // prevent pasting invalid characters into name/phone
  function handlePaste(e) {
    const { name } = e.target;
    const text = (e.clipboardData || window.clipboardData).getData("text");
    if (name === "firstName" || name === "lastName") {
      if (/[^A-Za-z .'\u00C0-\u024F-]/.test(text)) e.preventDefault();
    }
    if (name === "phoneNumber") {
      if (/\D/.test(text)) e.preventDefault();
    }
  }

  async function onSubmit(e) {
    e.preventDefault();
    setMsg("");

    // final validation sweep
    const eAll = validateAll(form);
    setErrors(eAll);
    if (Object.values(eAll).some(Boolean)) {
      setMsg("Please fix the highlighted fields.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        firstName: form.firstName.trim(),
        lastName: form.lastName.trim(),
        address: form.address.trim(),
        phoneNumber: form.phoneNumber.trim(),
        email: form.email.trim(),
        password: form.password,
        dateOfBirth: form.dob, // "YYYY-MM-DD"
        gender: (form.gender || "").toUpperCase(),
        role: (form.role || "").toUpperCase(),
      };

      await http("/api/v1/auth/signup", {
        method: "POST",
        body: payload,
      });

      setMsg("Signup successful! You can now sign in.");
      // Optional redirect:
      // setTimeout(() => (window.location.href = "/signin"), 900);
    } catch (err) {
      setMsg(`Failed to sign up: ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Navbar />
      <div className="signup-wrapper">
        <div className="signup-left">
          <video src={logimg} autoPlay loop muted className="auth__video" />
        </div>

        <div className="signup-right">
          <h2>Create Your Account</h2>
          <p>Join us today and manage your coconut oil business easily.</p>

          <form className="signup-form" onSubmit={onSubmit} noValidate>
            {/* First Name */}
            <div className={`input-group ${errors.firstName ? "has-error" : ""}`}>
              <i className="bx bx-user"></i>
              <input
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                onPaste={handlePaste}
                type="text"
                placeholder="First Name"
                required
                inputMode="text"
                autoComplete="given-name"
              />
            </div>
            {errors.firstName && <small className="error-text">{errors.firstName}</small>}

            {/* Last Name */}
            <div className={`input-group ${errors.lastName ? "has-error" : ""}`}>
              <i className="bx bx-user"></i>
              <input
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                onPaste={handlePaste}
                type="text"
                placeholder="Last Name"
                required
                inputMode="text"
                autoComplete="family-name"
              />
            </div>
            {errors.lastName && <small className="error-text">{errors.lastName}</small>}

            {/* Address */}
            <div className={`input-group ${errors.address ? "has-error" : ""}`}>
              <i className="fas fa-map-marker-alt"></i>
              <input
                name="address"
                value={form.address}
                onChange={handleChange}
                type="text"
                placeholder="Address"
                required
                autoComplete="street-address"
              />
            </div>
            {errors.address && <small className="error-text">{errors.address}</small>}

            {/* Email */}
            <div className={`input-group ${errors.email ? "has-error" : ""}`}>
              <i className="bx bx-envelope"></i>
              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                type="email"
                placeholder="Email"
                required
                inputMode="email"
                autoComplete="email"
              />
            </div>
            {errors.email && <small className="error-text">{errors.email}</small>}

            {/* Phone */}
            <div className={`input-group ${errors.phoneNumber ? "has-error" : ""}`}>
              <i className="bx bx-phone"></i>
              <input
                name="phoneNumber"
                value={form.phoneNumber}
                onChange={handleChange}
                onPaste={handlePaste}
                type="tel"
                placeholder="Phone Number"
                required
                inputMode="numeric"
                pattern="\d*"
              />
            </div>
            {errors.phoneNumber && <small className="error-text">{errors.phoneNumber}</small>}

            {/* Password */}
            <div className={`input-group ${errors.password ? "has-error" : ""}`}>
              <i className="bx bx-lock"></i>
              <input
                name="password"
                value={form.password}
                onChange={handleChange}
                type="password"
                placeholder="Password"
                required
                autoComplete="new-password"
              />
            </div>
            {errors.password && <small className="error-text">{errors.password}</small>}

            {/* Confirm Password */}
            <div className={`input-group ${errors.confirmPassword ? "has-error" : ""}`}>
              <i className="bx bx-lock-alt"></i>
              <input
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                type="password"
                placeholder="Confirm Password"
                required
                autoComplete="new-password"
              />
            </div>
            {errors.confirmPassword && <small className="error-text">{errors.confirmPassword}</small>}

            {/* DOB */}
            <div className={`input-group ${errors.dob ? "has-error" : ""}`}>
              <i className="bx bx-calendar"></i>
              <input
                name="dob"
                value={form.dob}
                onChange={handleChange}
                type="date"
                max={maxDob}
                required
              />
            </div>
            {errors.dob && <small className="error-text">{errors.dob}</small>}

            {/* Gender */}
            <div className={`input-group ${errors.gender ? "has-error" : ""}`}>
              <i className="bx bx-user"></i>
              <select
                name="gender"
                value={form.gender}
                onChange={handleChange}
                required
              >
                <option value="">Select Gender</option>
                <option value="MALE">Male</option>
                <option value="FEMALE">Female</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
            {errors.gender && <small className="error-text">{errors.gender}</small>}

            {/* Role */}
            <div className={`input-group ${errors.role ? "has-error" : ""}`}>
              <i className="bx bx-user-pin"></i>
              <select
                name="role"
                value={form.role}
                onChange={handleChange}
                required
              >
                <option value="">Select Role</option>
                <option value="CUSTOMER">Oil Customer</option>
                <option value="SUPPLIER">Coconut Seller</option>
                <option value="PRODUCTION">Production Staff</option>
                <option value="DELIVERY">Delivery Staff</option>
                <option value="QUALITY">Quality Inspector</option>
                <option value="OWNER">Shop Owner</option>
              </select>
            </div>
            {errors.role && <small className="error-text">{errors.role}</small>}

            {msg && (
              <p style={{ color: msg.startsWith("Failed") ? "crimson" : "green" }}>
                {msg}
              </p>
            )}

            <button type="submit" className="signup-btn" disabled={loading}>
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="signup-footer">
              Already have an account? <a href="/signin">Login here</a>
            </p>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
