import React, { createContext, useContext, useMemo, useState, useEffect } from "react";

const AuthCtx = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");
  const [role, setRole] = useState("");

  // decode role from JWT if present (server doesn’t add role claim; we infer via probes or add later)
  useEffect(() => {
    if (!token) { setRole(""); return; }
    try {
      const [, payload] = token.split(".");
      const json = JSON.parse(atob(payload));
      // if you later add "role" claim in JWT, read it here:
      // setRole(json.role ?? "");
      // for now leave empty; we can probe role by calling an endpoint if needed
    } catch { /* ignore */ }
  }, [token]);

  const value = useMemo(() => ({
    token,
    role,
    setToken: (t) => {
      setToken(t || "");
      if (t) localStorage.setItem("token", t);
      else localStorage.removeItem("token");
    },
    logout: () => {
      setToken("");
      setRole("");
      localStorage.removeItem("token");
    },
  }), [token, role]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}

export function useAuth() {
  return useContext(AuthCtx);
}
