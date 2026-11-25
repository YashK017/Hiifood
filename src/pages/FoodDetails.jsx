import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { MapPin, Clock, Star, ShieldCheck, ArrowLeft } from "lucide-react";
import { PublicLayout } from "../components/Layout";
import { StatusBadge } from "../components/FoodCard";
import { getDonation, createRequest } from "../services/donations";
import { useAuth } from "../context/AuthContext";

export default function FoodDetails() {
  const { id } = useParams();
  const food = getDonation(id);
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  if (!food) {
    return (
      <PublicLayout>
        <div className="container empty" style={{ paddingTop: 80 }}>
          <span className="emoji">🤔</span>
          <h2>Food not found</h2>
          <Link to="/browse" className="btn btn-primary">
            Back to browse
          </Link>
        </div>
      </PublicLayout>
    );
  }

  function claim() {
    setError(null);
    if (!user) {
      navigate("/login", { state: { from: `/food/${food.id}` } });
      return;
    }
    try {
      createRequest(food, user);
      setMessage("Requested! The donor will confirm your pickup soon.");
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <PublicLayout>
      <div className="container" style={{ paddingTop: 30 }}>
        <Link to="/browse" className="btn btn-ghost" style={{ paddingLeft: 0 }}>
          <ArrowLeft size={16} /> Back to all food
        </Link>

        <div className="detail-grid">
          <div>
            <img src={food.image} alt={food.name} />
          </div>
          <div>
            <StatusBadge status={food.status} />
            <h1 style={{ fontSize: 30, marginTop: 10 }}>{food.name}</h1>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>{food.description}</p>

            <div className="card" style={{ padding: "8px 18px", marginTop: 20 }}>
              <div className="info-row">
                <span>Donor</span>
                <b>
                  {food.donor.name} ({food.donor.type})
                </b>
              </div>
              <div className="info-row">
                <span>Rating</span>
                <b style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <Star size={14} fill="var(--secondary)" color="var(--secondary)" /> {food.donor.rating}
                </b>
              </div>
              <div className="info-row">
                <span>Quantity</span>
                <b>{food.quantity}</b>
              </div>
              <div className="info-row">
                <span>Pickup time</span>
                <b>{food.pickupTime}</b>
              </div>
              <div className="info-row">
                <span>Best before</span>
                <b>{food.expiry}</b>
              </div>
              <div className="info-row">
                <span>Location</span>
                <b style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                  <MapPin size={14} /> {food.location}
                </b>
              </div>
            </div>

            {message && <p className="alert alert-success form-success" style={{ marginTop: 16 }}>{message}</p>}
            {error && <p className="alert alert-danger form-error" style={{ marginTop: 16 }}>{error}</p>}

            {!isAdmin && food.status !== "claimed" && !message && (
              <button className="btn btn-primary btn-block" style={{ marginTop: 20 }} onClick={claim}>
                <Clock size={16} /> Claim this food
              </button>
            )}
            {isAdmin && (
              <p className="demo-hint" style={{ marginTop: 20 }}>
                You're signed in as admin — manage this listing from the Admin Panel.
              </p>
            )}
          </div>
        </div>

        <div className="grid-2" style={{ marginTop: 30, paddingBottom: 40 }}>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <ShieldCheck size={18} color="var(--success)" /> Food safety
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>
              This food was prepared today and stored safely. Please consume it
              before the listed expiry time and reheat cooked meals before eating.
            </p>
          </div>
          <div className="card" style={{ padding: 24 }}>
            <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <MapPin size={18} color="var(--primary)" /> Pickup instructions
            </h3>
            <p style={{ color: "var(--muted)", fontSize: 14, marginTop: 8 }}>
              Arrive within the pickup window, carry a clean bag or box, and show
              your HiiFood request at the door.
            </p>
          </div>
        </div>
      </div>
    </PublicLayout>
  );
}
