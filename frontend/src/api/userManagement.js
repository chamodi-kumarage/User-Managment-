const API_BASE = process.env.REACT_APP_API_BASE || "http://localhost:8080";

function authHeaders() {
  const t = localStorage.getItem("token");
  return t ? { Authorization: `Bearer ${t}` } : {};
}

export async function signup(payload) {
  const res = await fetch(`${API_BASE}/api/v1/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signup failed");
  return data;
}

export async function signin(email, password) {
  const res = await fetch(`${API_BASE}/api/v1/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Signin failed");
  return data; // { token, refreshToken }
}

export async function me() {
  const res = await fetch(`${API_BASE}/api/v1/auth/me`, { headers: authHeaders() });
  if (res.status === 401) throw new Error("Unauthenticated");
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Me failed");
  return data; // { id, email, firstName, lastName, role, address, phoneNumber, dateOfBirth, gender }
}

// -------- NEW: update profile --------
export async function updateMe(payload, { method = "PUT" } = {}) {
  const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
    method,
    headers: { "Content-Type": "application/json", ...authHeaders() },
    body: JSON.stringify(payload),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const msg = data?.error || data?.message || "Update failed";
    throw new Error(msg);
  }
  return data; // updated MeDto
}

// -------- NEW: delete profile --------
export async function deleteMe() {
  const res = await fetch(`${API_BASE}/api/v1/auth/me`, {
    method: "DELETE",
    headers: authHeaders(),
  });
  if (res.status === 204) return true;
  const data = await res.json().catch(() => ({}));
  const msg = data?.error || data?.message || "Delete failed";
  throw new Error(msg);
}

export function getAuthHeaders() {
  return authHeaders();
}


// -------- forgot password --------
export async function requestPasswordReset(emailOrPhone) {
  const res = await fetch(`${API_BASE}/api/v1/auth/forgot-password/request`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier: emailOrPhone }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Failed to request reset");
  return data;
}

export async function verifyOtp(identifier, otp) {
  const res = await fetch(`${API_BASE}/api/v1/auth/forgot-password/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, otp }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Invalid OTP");
  return data;
}

export async function resetPassword(identifier, newPassword) {
  const res = await fetch(`${API_BASE}/api/v1/auth/forgot-password/reset`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ identifier, newPassword }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.message || "Reset failed");
  return data;
}

// Admin User Management Functions (Placeholders)
export async function listAllUsers() {
  console.warn("listAllUsers: Not implemented yet.");
  // Implement actual API call to fetch all users
  return [];
}

export async function createUserByAdmin(userData) {
  console.warn("createUserByAdmin: Not implemented yet.");
  // Implement actual API call to create a user as admin
  return { id: Math.random().toString(36).substring(7), ...userData };
}

export async function updateUserByAdmin(id, userData) {
  console.warn("updateUserByAdmin: Not implemented yet.");
  // Implement actual API call to update a user as admin
  return { id, ...userData };
}

export async function deleteUserByAdmin(id) {
  console.warn("deleteUserByAdmin: Not implemented yet.");
  // Implement actual API call to delete a user as admin
  return { id };
}