import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { HomePage } from "@/pages/HomePage";
import { TourDetailsPage } from "@/pages/TourDetailsPage";
import { AboutPage } from "@/pages/AboutPage";
import { BookingPage } from "@/pages/BookingPage";
import { UserDashboardPage } from "@/pages/UserDashboardPage";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";
import { EmployeeDashboardPage } from "@/pages/EmployeeDashboardPage";
import { ResetPasswordPage } from "@/pages/ResetPasswordPage";
import { LoginPage } from "@/pages/LoginPage";
import { RegisterPage } from "@/pages/RegisterPage";
import { ProtectedRoute } from "./components/routes/ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/tours/:id" element={<TourDetailsPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/booking" element={<BookingPage />} />

        {/* Auth Routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />

        {/* Portal Routes */}
        <Route path="/dashboard" element={<ProtectedRoute><UserDashboardPage /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute requiredRole="ADMIN"><AdminDashboardPage /></ProtectedRoute>} />
        <Route path="/employee" element={<ProtectedRoute requiredRole={["EMPLOYEE", "DISPATCH", "TOURGUIDE"]}><EmployeeDashboardPage /></ProtectedRoute>} />

        {/* Error Fallbacks */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
