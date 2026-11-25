import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PublicLayout } from "../components/Layout";
import { useAuth } from "../context/AuthContext";

export default function Signup() {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState(null);

  function submit(e) {
    e.preventDefault();
    setError(null);
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    try {
      signup({ name, email, password });
      navigate("/dashboard", { replace: true });
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <PublicLayout>
      <div className="auth-wrap">
        <div className="card auth-card">
          <h1>Create your account</h1>
          <p className="sub">Free forever. No payments on HiiFood.</p>

          <form onSubmit={submit}>
            <div>
              <label className="form-label label" htmlFor="name">Full name</label>
              <input
                id="name"
                className="form-control input"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Yash Kumar"
                required
              />
            </div>
            <div>
              <label className="form-label label" htmlFor="semail">Email</label>
              <input
                id="semail"
                type="email"
                className="form-control input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
              />
            </div>
            <div>
              <label className="form-label label" htmlFor="spassword">Password</label>
              <input
                id="spassword"
                type="password"
                className="form-control input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                required
              />
            </div>
            <div>
              <label className="form-label label" htmlFor="sconfirm">Confirm password</label>
              <input
                id="sconfirm"
                type="password"
                className="form-control input"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="Repeat your password"
                required
              />
            </div>

            {error && <p className="alert alert-danger form-error">{error}</p>}

            <button type="submit" className="btn btn-primary btn-block">
              Create account
            </button>
          </form>

          <p className="auth-alt">
            Already with us? <Link to="/login">Login</Link>
          </p>
        </div>
      </div>
    </PublicLayout>
  );
}
