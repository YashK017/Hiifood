import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { PublicLayout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import { homeFor } from "../App";

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);

  function submit(e) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      const user = login({ email, password });
      // Admins land on the admin panel, users on their dashboard.
      const dest = user.role === "admin" ? "/admin" : location.state?.from || homeFor(user);
      navigate(dest, { replace: true });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <PublicLayout>
      <div className="auth-wrap">
        <div className="card auth-card">
          <h1>Welcome back</h1>
          <p className="sub">Log in to share food or claim a meal.</p>

          <form onSubmit={submit}>
            <div>
              <label className="form-label label" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="form-control input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="form-label label" htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                className="form-control input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            {error && <p className="alert alert-danger form-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block" disabled={busy}>
              {busy ? "Logging in…" : "Login"}
            </button>
          </form>

          <div className="demo-hint">
            <b>Demo accounts (saved in your browser):</b>
            <br />
            👤 User — demo@hiifood.com / password123
            <br />
            🛡️ Admin — admin@hiifood.com / admin123
          </div>

          <p className="auth-alt">
            New to HiiFood? <Link to="/signup">Create an account</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
