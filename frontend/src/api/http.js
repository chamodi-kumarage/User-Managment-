// Tiny wrapper around fetch with better errors and base URL from .env
const API_BASE = process.env.REACT_APP_API_URL ?? "http://localhost:8080";

export async function http(path, { method = "GET", headers = {}, body, token } = {}) {
  const finalHeaders = {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...headers,
  };

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers: finalHeaders,
    body: body ? JSON.stringify(body) : undefined,
    credentials: "include", // safe with our CORS config
  });

  // Try to parse JSON if possible; otherwise read text
  let data;
  const ct = res.headers.get("content-type") || "";
  if (ct.includes("application/json")) {
    data = await res.json().catch(() => undefined);
  } else {
    const text = await res.text().catch(() => "");
    data = text ? { message: text } : undefined;
  }

  if (!res.ok) {
    const message =
      (data && (data.error || data.message)) ||
      `Request failed (${res.status})`;
    const err = new Error(message);
    err.status = res.status;
    err.data = data;
    throw err;
  }

  return data;
}
