// src/lib/roles.js

// "customer" -> "CUSTOMER"
export const normalizeRole = (r) => String(r || "").trim().toUpperCase();

// Map role -> dashboard route (we use /dashboard/<role>)
export const roleToDashboard = (role) => {
  switch (normalizeRole(role)) {
    case "OWNER":      return "/dashboard/owner";
    case "SUPPLIER":   return "/dashboard/supplier";
    case "DELIVERY":   return "/dashboard/delivery";
    case "PRODUCTION": return "/dashboard/production";
    case "QUALITY":    return "/dashboard/quality";
    case "CUSTOMER":   return "/dashboard/customer";
    default:           return "/signin";
  }
};
                                