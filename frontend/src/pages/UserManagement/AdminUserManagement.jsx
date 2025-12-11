import React, { useEffect, useMemo, useState } from "react";
import {
  listAllUsers,
  createUserByAdmin,
  updateUserByAdmin,
  deleteUserByAdmin,
} from "../../api/userManagement";
import "../../styles/UserManagement/adminUserManagement.css";

const ROLES_FOR_CREATE = ["OWNER", "SUPPLIER", "DELIVERY", "PRODUCTION", "QUALITY"]; // cannot create CUSTOMER

const emptyForm = {
  id: null,
  firstName: "",
  lastName: "",
  email: "",
  password: "",   // only required on create
  role: "SUPPLIER",
  phoneNumber: "",
  address: "",
  gender: "",
  dateOfBirth: "",
};

// helpers
const sanitizeName = (v) => v.replace(/[^A-Za-z\s\-']/g, ""); // letters, spaces, hyphen, apostrophe
const digitsOnly = (v) => v.replace(/\D/g, "");
const emailOk = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const today = new Date();
const startOfToday = new Date(today.getFullYear(), today.getMonth(), today.getDate());
const y = new Date(startOfToday.getTime() - 24 * 60 * 60 * 1000);
const maxDobStr = y.toISOString().slice(0, 10); // yesterday

export default function AdminUserManagement() {
  const [loading, setLoading] = useState(true);
  const [rows, setRows] = useState([]);
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");

  const [q, setQ] = useState("");
  const [roleFilter, setRoleFilter] = useState("");

  // form state
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [mode, setMode] = useState("create"); // "create" | "edit"
  const [fieldErrors, setFieldErrors] = useState({}); // {firstName: "...", ...}

  async function refresh() {
    setLoading(true);
    setError(""); setOk("");
    try {
      const data = await listAllUsers(); // show ALL users
      setRows(Array.isArray(data) ? data : []);
    } catch (e) {
      setError(e.message || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => { refresh(); }, []);

  const filtered = useMemo(() => {
    const text = q.trim().toLowerCase();
    return rows.filter(u => {
      if (roleFilter && u.role !== roleFilter) return false;
      if (!text) return true;
      const hay =
        `${u.firstName ?? ""} ${u.lastName ?? ""} ${u.email ?? ""} ${u.phoneNumber ?? ""} ${u.role ?? ""}`.toLowerCase();
      return hay.includes(text);
    });
  }, [rows, q, roleFilter]);

  function openCreate() {
    setMode("create");
    setForm({ ...emptyForm, role: "SUPPLIER" });
    setFieldErrors({});
    setError(""); setOk("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function openEdit(u) {
    setMode("edit");
    setForm({
      id: u.id,
      firstName: u.firstName || "",
      lastName: u.lastName || "",
      email: u.email || "",
      password: "",
      role: u.role || "SUPPLIER",
      phoneNumber: u.phoneNumber || "",
      address: u.address || "",
      gender: u.gender || "",
      dateOfBirth: u.dateOfBirth || "",
    });
    setFieldErrors({});
    setError(""); setOk("");
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  function closeForm() {
    setShowForm(false);
    setForm({ ...emptyForm, role: "SUPPLIER" });
    setMode("create");
    setFieldErrors({});
    setError(""); setOk("");
  }

  // live validation
  function validate(current) {
    const e = {};
    const f = current;

    // names
    if (!f.firstName?.trim()) e.firstName = "First name is required.";
    else if (!/^[A-Za-z\s\-']+$/.test(f.firstName)) e.firstName = "Letters, spaces, - and ’ only.";

    if (!f.lastName?.trim()) e.lastName = "Last name is required.";
    else if (!/^[A-Za-z\s\-']+$/.test(f.lastName)) e.lastName = "Letters, spaces, - and ’ only.";

    // email
    if (!f.email?.trim()) e.email = "Email is required.";
    else if (!emailOk(f.email)) e.email = "Invalid email.";

    // role (cannot be CUSTOMER here)
    if (!f.role) e.role = "Role is required.";

    // password create only
    if (mode === "create") {
      if (!f.password) e.password = "Password is required.";
      else if (f.password.length < 6) e.password = "Min 6 characters.";
    }

    // phone: optional but if present -> digits only & reasonable length
    if (f.phoneNumber) {
      if (!/^\d+$/.test(f.phoneNumber)) e.phoneNumber = "Digits only.";
      else if (f.phoneNumber.length < 7) e.phoneNumber = "Too short.";
    }

    // date of birth: optional, but must be before today if present
    if (f.dateOfBirth) {
      const d = new Date(f.dateOfBirth);
      if (!(d instanceof Date) || isNaN(d.getTime())) e.dateOfBirth = "Invalid date.";
      else if (d >= startOfToday) e.dateOfBirth = "DOB cannot be today or future.";
    }

    return e;
  }

  function setAndValidate(next) {
    setForm(next);
    setFieldErrors(validate(next));
  }

  function onChange(e) {
    const { name } = e.target;
    let { value } = e.target;

    if (name === "firstName" || name === "lastName") value = sanitizeName(value);
    if (name === "phoneNumber") value = digitsOnly(value);

    const next = { ...form, [name]: value };
    setAndValidate(next);
  }

  // hard guard against typing invalid chars
  function onlyLettersKeyDown(e) {
    const allowedControl = ["Backspace","Delete","ArrowLeft","ArrowRight","Tab","Home","End"];
    if (allowedControl.includes(e.key)) return;
    if (/^[A-Za-z\s\-']$/.test(e.key)) return;
    e.preventDefault();
  }
  function onlyDigitsKeyDown(e) {
    const allowedControl = ["Backspace","Delete","ArrowLeft","ArrowRight","Tab","Home","End"];
    if (allowedControl.includes(e.key)) return;
    if (/^\d$/.test(e.key)) return;
    e.preventDefault();
  }

  async function onSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    setFieldErrors(errs);
    if (Object.keys(errs).length) return;

    setSaving(true);
    setError(""); setOk("");
    try {
      if (mode === "create") {
        await createUserByAdmin(form);
        setOk("User created.");
      } else {
        const { id, password, email, ...rest } = form; // email/password not changed here
        await updateUserByAdmin(id, rest);
        setOk("User updated.");
      }
      await refresh();
      closeForm();
    } catch (e2) {
      setError(e2.message || "Save failed");
    } finally {
      setSaving(false);
    }
  }

  async function onDelete(u) {
    if (!window.confirm(`Delete ${u.firstName} ${u.lastName}?`)) return;
    setError(""); setOk("");
    try {
      await deleteUserByAdmin(u.id);
      setOk("User deleted.");
      setRows(prev => prev.filter(r => r.id !== u.id));
    } catch (e) {
      setError(e.message || "Delete failed");
    }
  }

  return (
    <div className="aum__wrap">
      <header className="aum__header aum__header--sticky">
        <div>
          <h2>User Management</h2>
          <p>View all users. Add, edit, and delete non-customer users.</p>
        </div>
        <button className="aum__btn aum__btn--primary" onClick={openCreate}>
          + Add User
        </button>
      </header>

      {/* Form card (hidden until Add/Edit) */}
      {showForm && (
        <section className="aum__card">
          <div className="aum__cardHead">
            <h3>{mode === "create" ? "Add User" : "Edit User"}</h3>
            <button onClick={closeForm} className="aum__btn aum__btn--ghost">Close</button>
          </div>

          <form className="aum__form" onSubmit={onSubmit} noValidate>
            <div className="aum__grid">
              <div className="aum__field">
                <label>First Name</label>
                <input
                  name="firstName"
                  value={form.firstName}
                  onChange={onChange}
                  onKeyDown={onlyLettersKeyDown}
                  required
                />
                {fieldErrors.firstName && <div className="aum__errText">{fieldErrors.firstName}</div>}
              </div>

              <div className="aum__field">
                <label>Last Name</label>
                <input
                  name="lastName"
                  value={form.lastName}
                  onChange={onChange}
                  onKeyDown={onlyLettersKeyDown}
                  required
                />
                {fieldErrors.lastName && <div className="aum__errText">{fieldErrors.lastName}</div>}
              </div>

              <div className="aum__field">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={onChange}
                  required
                  disabled={mode === "edit"}
                />
                {fieldErrors.email && <div className="aum__errText">{fieldErrors.email}</div>}
              </div>

              <div className="aum__field">
                <label>Role</label>
                <select name="role" value={form.role} onChange={onChange}>
                  {ROLES_FOR_CREATE.map(r => <option key={r} value={r}>{r}</option>)}
                </select>
                {fieldErrors.role && <div className="aum__errText">{fieldErrors.role}</div>}
              </div>

              {mode === "create" && (
                <div className="aum__field">
                  <label>Password</label>
                  <input
                    name="password"
                    type="password"
                    value={form.password}
                    onChange={onChange}
                    placeholder="min 6 chars"
                    required
                  />
                  {fieldErrors.password && <div className="aum__errText">{fieldErrors.password}</div>}
                </div>
              )}

              <div className="aum__field">
                <label>Phone</label>
                <input
                  name="phoneNumber"
                  value={form.phoneNumber}
                  onChange={onChange}
                  onKeyDown={onlyDigitsKeyDown}
                  inputMode="numeric"
                  placeholder="digits only"
                />
                {fieldErrors.phoneNumber && <div className="aum__errText">{fieldErrors.phoneNumber}</div>}
              </div>

              <div className="aum__field">
                <label>Address</label>
                <input name="address" value={form.address} onChange={onChange} />
              </div>

              <div className="aum__field">
                <label>Gender</label>
                <select name="gender" value={form.gender} onChange={onChange}>
                  <option value="">—</option>
                  <option value="MALE">MALE</option>
                  <option value="FEMALE">FEMALE</option>
                  <option value="OTHER">OTHER</option>
                </select>
              </div>

              <div className="aum__field">
                <label>Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={form.dateOfBirth}
                  onChange={onChange}
                  max={maxDobStr} /* cannot be today or future */
                />
                {fieldErrors.dateOfBirth && <div className="aum__errText">{fieldErrors.dateOfBirth}</div>}
              </div>
            </div>

            {error && <div className="aum__alert aum__alert--err">{error}</div>}
            {ok && <div className="aum__alert aum__alert--ok">{ok}</div>}

            <div className="aum__actions">
              <button
                className="aum__btn aum__btn--primary"
                disabled={saving || Object.keys(fieldErrors).length > 0}
              >
                {saving ? "Saving..." : (mode === "create" ? "Create User" : "Save Changes")}
              </button>
              <button type="button" className="aum__btn" onClick={closeForm} disabled={saving}>
                Cancel
              </button>
            </div>
          </form>
        </section>
      )}

      {/* Table card */}
      <section className="aum__card">
        <div className="aum__tableHeader">
          <div className="aum__filters">
            <input
              className="aum__search"
              placeholder="Search name, email, phone…"
              value={q}
              onChange={e => setQ(e.target.value)}
            />
            <select
              className="aum__roleFilter"
              value={roleFilter}
              onChange={e => setRoleFilter(e.target.value)}
            >
              <option value="">All Roles</option>
              {["OWNER","SUPPLIER","DELIVERY","PRODUCTION","QUALITY","CUSTOMER"].map(r =>
                <option key={r} value={r}>{r}</option>
              )}
            </select>
          </div>
          <button className="aum__btn aum__btn--ghost" onClick={openCreate}>+ Add User</button>
        </div>

        {loading ? (
          <div className="aum__loading">Loading…</div>
        ) : (
          <div className="aum__tableWrap">
            <table className="aum__table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Role</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th style={{width: 140}}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 && (
                  <tr><td colSpan="6" className="aum__empty">No users found.</td></tr>
                )}
                {filtered.map(u => {
                  const isCustomer = u.role === "CUSTOMER";
                  return (
                    <tr key={u.id}>
                      <td>{u.id}</td>
                      <td><span className={`aum__pill aum__pill--${u.role?.toLowerCase()}`}>{u.role}</span></td>
                      <td>{u.firstName} {u.lastName}</td>
                      <td>{u.email}</td>
                      <td>{u.phoneNumber || "-"}</td>
                      <td className="aum__actionsCell">
                        {!isCustomer ? (
                          <>
                            <button
                              className="aum__chipBtn aum__chipBtn--edit"
                              onClick={() => openEdit(u)}
                            >
                              Edit
                            </button>
                            <button
                              className="aum__chipBtn aum__chipBtn--danger"
                              onClick={() => onDelete(u)}
                            >
                              Delete
                            </button>
                          </>
                        ) : <span className="aum__muted">—</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
