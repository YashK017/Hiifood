import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, Users, ShoppingBasket, Inbox, LogOut, Home, ShieldCheck } from "lucide-react";
import { Logo } from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
  { to: "/admin/users", label: "Users", icon: Users },
  { to: "/admin/donations", label: "All Donations", icon: ShoppingBasket },
  { to: "/admin/requests", label: "Requests", icon: Inbox },
];

export default function AdminLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dash">
      <aside className="dash-side">
        <Logo small />
        <div style={{ padding: "0 10px 14px", fontSize: 12, color: "var(--muted)", display: "flex", alignItems: "center", gap: 6 }}>
          <ShieldCheck size={14} color="#6a5ae0" /> Admin Panel
        </div>
        {NAV.map(({ to, label, icon: Icon, end }) => (
          <NavLink key={to} to={to} end={end}>
            <Icon size={17} /> {label}
          </NavLink>
        ))}
        <NavLink to="/">
          <Home size={17} /> Back to site
        </NavLink>
        <div className="spacer" />
        <div style={{ padding: "10px 14px", fontSize: 13, color: "var(--muted)" }}>
          Signed in as
          <br />
          <b style={{ color: "var(--text)" }}>{user?.name}</b>
          <span className="badge badge-admin" style={{ marginLeft: 6 }}>admin</span>
        </div>
        <button
          className="nav-item"
          onClick={() => {
            logout();
            navigate("/");
          }}
        >
          <LogOut size={17} /> Logout
        </button>
      </aside>
      <main className="dash-main">
        <Outlet />
      </main>
    </div>
  );
}
