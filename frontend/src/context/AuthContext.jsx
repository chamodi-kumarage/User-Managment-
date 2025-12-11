import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { http } from "../api/http";
import { setAuthToken } from "../lib/api/index";

const AuthCtx = createContext(null);
export function useAuth() { return useContext(AuthCtx); }

export default function AuthProvider({ children }) {
  const [booted, setBooted] = useState(false);
  const [user, setUser]   = useState(null); // { email, role }
  const [token, setToken] = useState(() => localStorage.getItem("token") || "");

  // Boot: try to hydrate user from token (optional /me endpoint)
  useEffect(() => {
    (async () => {
      if (!token) { setBooted(true); return; }
      try {
        // If you don’t have /api/v1/auth/me, you can decode locally or
        // call a cheap protected endpoint just to verify.
        const me = await http("/api/v1/auth/me", { token }).catch(() => null);
        if (me && me.email) setUser(me);
      } finally {
        setBooted(true);
      }
    })();
  }, [token]);

  async function signin(email, password) {
    const data = await http("/api/v1/auth/signin", {
      method: "POST",
      body: { email, password },
    });
    // expected backend response: { token: "...", refreshToken: "...", role, email }
    const t = data.token;
    if (!t) throw new Error("No token in response");
    setAuthToken(t, "token"); // Use the same key as getToken() expects
    setToken(t);
    setUser({ email: data.email ?? email, role: data.role }); // keep role if backend returns it
    return data;
  }

  function logout() {
    setAuthToken("", "token"); // Clear the token
    setToken("");
    setUser(null);
  }

  const value = useMemo(() => ({
    user, token, booted, signin, logout,
  }), [user, token, booted]);

  return <AuthCtx.Provider value={value}>{children}</AuthCtx.Provider>;
}
