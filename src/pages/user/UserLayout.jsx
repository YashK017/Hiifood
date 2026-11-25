import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { LayoutDashboard, ShoppingBasket, PlusCircle, Bell, LogOut, Home } from "lucide-react";
import { Logo } from "../../components/Layout";
import { useAuth } from "../../context/AuthContext";

const NAV = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard, end: true },
  { to: "/dashboard/donations", label: "My Donations", icon: ShoppingBasket },
  { to: "/dashboard/add", label: "Add Donation", icon: PlusCircle },
  { to: "/dashboard/requests", label: "My Requests", icon: Bell },
];

export default function UserLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="dash">
      <aside className="dash-side">
        <Logo small />
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
