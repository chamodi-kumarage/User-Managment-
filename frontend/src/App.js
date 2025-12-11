import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Common Pages
import Home from "./pages/Common/Home";
import Unauthorized from "./pages/Common/Unauthorized";

// User Management Pages
import SigninPage from "./pages/UserManagement/SigninPage";
import SignupPage from "./pages/UserManagement/SignupPage";
import ForgotPasswordPage from "./pages/UserManagement/ForgotPasswordPage";
import ResetPasswordPage from "./pages/UserManagement/ResetPasswordPage";
import OtpValidationPage from "./pages/UserManagement/OtpValidationPage";

// Dashboards
import AdminUserManagement from "./pages/UserManagement/AdminUserManagement";
import OwnerDashboard from "./pages/Dashboard/OwnerDashboard";
import SupplierDashboard from "./pages/Dashboard/SupplierDashboard";
import DeliveryDashboard from "./pages/Dashboard/DeliveryDashboard";
import ProductionDashboard from "./pages/Dashboard/ProductionDashboard";
import QualityDashboard from "./pages/Dashboard/QualityDashboard";
import CustomerDashboard from "./pages/Dashboard/CustomerDashboard";

// Layouts - These are wrappers that include sidebars and other common elements.
import OwnerLayout from "./pages/Common/OwnerLayout";
import SupplierLayout from "./pages/Common/SupplierLayout";
import DeliveryLayout from "./pages/Common/DeliveryLayout";
import ProductionLayout from "./pages/Common/ProductionLayout";
import QualityLayout from "./pages/Common/QualityLayout";
import CustomerLayout from "./pages/Common/CustomerLayout";

// Context and Protected Routes
import AuthProvider from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <div style={{ border: "2px solid blue", minHeight: "100vh" }}> {/* Added temporary border and minHeight */}
      <AuthProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SigninPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/otp-validation" element={<OtpValidationPage />} />
          <Route path="/unauthorized" element={<Unauthorized />} />

          {/* Protected Routes */}
          {/* Admin Routes */}
          <Route element={<ProtectedRoute allowed={["ADMIN"]} />}>
            <Route path="/admin/usermanagement" element={<AdminUserManagement />} />
          </Route>

          {/* Owner Routes */}
          <Route path="/dashboard/owner" element={<OwnerLayout><OwnerDashboard /></OwnerLayout>} />

          {/* Supplier Routes */}
          <Route path="/dashboard/supplier" element={<SupplierLayout><SupplierDashboard /></SupplierLayout>} />

          {/* Delivery Routes */}
          <Route path="/dashboard/delivery" element={<DeliveryLayout><DeliveryDashboard /></DeliveryLayout>} />

          {/* Production Routes */}
          <Route path="/dashboard/production" element={<ProductionLayout><ProductionDashboard /></ProductionLayout>} />

          {/* Quality Routes */}
          <Route path="/dashboard/quality" element={<QualityLayout><QualityDashboard /></QualityLayout>} />

          {/* Customer Routes */}
          <Route path="/dashboard/customer" element={<CustomerLayout><CustomerDashboard /></CustomerLayout>} />

          {/* Catch-all for undefined routes - redirect to home or a 404 page */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
