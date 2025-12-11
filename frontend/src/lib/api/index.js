// frontend/src/lib/api/index.js
const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:8080";

/* ---------------- Token helpers ---------------- */
function getToken() {
  // Common keys
  const keys = ["jwt", "token", "accessToken", "authToken"];
  for (const k of keys) {
    const v = localStorage.getItem(k);
    if (v && v !== "null" && v !== "undefined") return v;
  }
  // Sometimes apps stash the token inside a 'user' object
  try {
    const u = JSON.parse(localStorage.getItem("user") || "{}");
    if (u?.token) return u.token;
    if (u?.accessToken) return u.accessToken;
    if (u?.jwt) return u.jwt;
  } catch (e) {}
  return "";
}

export function getAuthHeaders() {
  const t = getToken();
  // TEMP: log what header we’re sending so you can verify in DevTools
  console.debug("[api] base:", API_BASE, "| token?", Boolean(t));
  return t
    ? { Authorization: `Bearer ${t}`, "Content-Type": "application/json" }
    : { "Content-Type": "application/json" };
}

export function setAuthToken(token, key = "jwt") {
  if (token) localStorage.setItem(key, token);
  else localStorage.removeItem(key);
}

/* ---------------- Unified response handler ---------------- */
async function handle(res) {
  const ct = res.headers.get("content-type") || "";
  const isJson = ct.includes("application/json");
  const body = await (isJson ? res.json().catch(() => ({})) : res.text().catch(() => ""));
  if (res.ok) return body;

  // Log everything so you can see the exact failure
  console.error("[api] ERROR:", {
    url: res.url,
    status: res.status,
    statusText: res.statusText,
    body,
  });
  const msg =
    `HTTP ${res.status} ${res.statusText}` +
    (body ? ` — ${typeof body === "string" ? body : JSON.stringify(body)}` : "");
  throw new Error(msg);
}

/* ---------------- INVENTORY ---------------- */
export async function getItems() {
  const res = await fetch(`${API_BASE}/api/items`, { headers: getAuthHeaders() });
  return handle(res);
}
export async function getItem(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, { headers: getAuthHeaders() });
  return handle(res);
}
export async function createItem(payload) {
  const res = await fetch(`${API_BASE}/api/items`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return handle(res);
}
export async function updateItem(id, payload) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return handle(res);
}
export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/api/items/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handle(res);
}

/* ---------------- PRODUCTIONS ---------------- */
export async function getProductions() {
  const res = await fetch(`${API_BASE}/api/productions`, { headers: getAuthHeaders() });
  return handle(res);
}
export async function getProduction(id) {
  const res = await fetch(`${API_BASE}/api/productions/${id}`, { headers: getAuthHeaders() });
  return handle(res);
}
export async function createProduction(payload) {
  const res = await fetch(`${API_BASE}/api/productions`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return handle(res);
}
export async function updateProduction(id, payload) {
  const res = await fetch(`${API_BASE}/api/productions/${id}`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(payload),
  });
  return handle(res);
}
export async function deleteProduction(id) {
  const res = await fetch(`${API_BASE}/api/productions/${id}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  });
  return handle(res);
}

/* ---------------- Compatibility object ---------------- */
export const api = {
  getAuthHeaders, setAuthToken,
  getItems, getItem, createItem, updateItem, deleteItem,
  getProductions, getProduction, createProduction, updateProduction, deleteProduction,
};
export const authApi = api;
