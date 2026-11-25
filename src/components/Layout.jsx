import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { homeFor } from "../App";

export function Logo({ small }) {
  return (
    <Link to="/" className="logo" style={small ? { fontSize: 18 } : undefined}>
      <img src="/images/logo.png" alt="HiiFood logo" style={small ? { width: 28, height: 28 } : undefined} />
      <div>
        Hii<span>Food</span>
      </div>
    </Link>
  );
}

export function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <nav className="navbar navbar-expand-md sticky-top site-header">
      <div className="container">
        <Logo />
        <button
          className="navbar-toggler"
          type="button"
          aria-controls="mainNav"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className={`collapse navbar-collapse${open ? " show" : ""}`} id="mainNav">
          <ul className="navbar-nav ms-auto align-items-md-center gap-1 nav-links">
            <li className="nav-item">
              <NavLink to="/" end className="nav-link" onClick={close}>Home</NavLink>
            </li>
            <li className="nav-item">
              <NavLink to="/browse" className="nav-link" onClick={close}>Find Food</NavLink>
            </li>
            {user ? (
              <>
                <li className="nav-item">
                  <NavLink to={homeFor(user)} className="nav-link" onClick={close}>
                    {user.role === "admin" ? "Admin Panel" : "Dashboard"}
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className="btn btn-ghost"
                    onClick={() => {
                      close();
                      logout();
                      navigate("/");
                    }}
                  >
                    Logout
                  </button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link to="/login" className="btn btn-ghost" onClick={close}>Login</Link>
                </li>
                <li className="nav-item">
                  <Link to="/signup" className="btn btn-primary" onClick={close}>Sign Up</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container" style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
        <Logo small />
        <p>Share extra food. Help someone. Waste less. © 2026 HiiFood</p>
      </div>
    </footer>
  );
}

export function PublicLayout({ children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <main style={{ flex: 1 }}>{children}</main>
      <Footer />
    </div>
  );
}
