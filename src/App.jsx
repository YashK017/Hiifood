import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "./context/AuthContext";

import Home from "./pages/Home";
import Browse from "./pages/Browse";
import FoodDetails from "./pages/FoodDetails";
import Login from "./pages/Login";
import Signup from "./pages/Signup";

import UserLayout from "./pages/user/UserLayout";
import Overview from "./pages/user/Overview";
import MyDonations from "./pages/user/MyDonations";
import AddDonation from "./pages/user/AddDonation";
import MyRequests from "./pages/user/MyRequests";

import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminDonations from "./pages/admin/AdminDonations";
import AdminRequests from "./pages/admin/AdminRequests";

function RequireAuth({ children }) {
  const { user, ready } = useAuth();
  const location = useLocation();
  if (!ready) return null;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
}

function RequireAdmin({ children }) {
  const { user, ready } = useAuth();
  if (!ready) return null;
  if (!user) return <Navigate to="/login" replace />;
  if (user.role !== "admin") return <Navigate to="/dashboard" replace />;
  return children;
}

// After login: admins go to /admin, everyone else to /dashboard.
export function homeFor(user) {
  return user?.role === "admin" ? "/admin" : "/dashboard";
}

export default function App() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/" element={<Home />} />
      <Route path="/browse" element={<Browse />} />
      <Route path="/food/:id" element={<FoodDetails />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      {/* User module */}
      <Route
        path="/dashboard"
        element={
          <RequireAuth>
            <UserLayout />
          </RequireAuth>
        }
      >
        <Route index element={<Overview />} />
        <Route path="donations" element={<MyDonations />} />
        <Route path="add" element={<AddDonation />} />
        <Route path="requests" element={<MyRequests />} />
      </Route>

      {/* Admin module */}
      <Route
        path="/admin"
        element={
          <RequireAdmin>
            <AdminLayout />
          </RequireAdmin>
        }
      >
        <Route index element={<AdminDashboard />} />
        <Route path="users" element={<AdminUsers />} />
        <Route path="donations" element={<AdminDonations />} />
        <Route path="requests" element={<AdminRequests />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
