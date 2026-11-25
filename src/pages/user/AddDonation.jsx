import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PartyPopper } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { createDonation } from "../../services/donations";
import { FOOD_TYPES, CATEGORIES } from "../../data/foods";

const EMPTY = {
  name: "",
  foodType: "Cooked Meal",
  category: "meals",
  quantity: "",
  location: "",
  pickupTime: "",
  expiry: "",
  description: "",
};

export default function AddDonation() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState(EMPTY);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(null);

  const set = (key) => (e) => setForm({ ...form, [key]: e.target.value });

  function submit(e) {
    e.preventDefault();
    setError(null);
    if (!form.name.trim() || !form.quantity.trim() || !form.location.trim()) {
      setError("Please fill in the food name, quantity and pickup location.");
      return;
    }
    createDonation(form, user);
    setDone(true);
  }

  if (done) {
    return (
      <div className="card empty" style={{ marginTop: 40 }}>
        <PartyPopper size={44} color="var(--primary)" />
        <h2>Your food is now available!</h2>
        <p>People nearby can see your donation and request it.</p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            className="btn btn-outline"
            onClick={() => {
              setForm(EMPTY);
              setDone(false);
            }}
          >
            Add another
          </button>
          <button className="btn btn-primary" onClick={() => navigate("/dashboard/donations")}>
            View my donations
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 640 }}>
      <h1 className="dash-title">Add Donation</h1>
      <p className="dash-sub">Tell people what you're sharing and when they can pick it up.</p>

      <form className="card" style={{ marginTop: 22, padding: 26, display: "flex", flexDirection: "column", gap: 16 }} onSubmit={submit}>
        <div>
          <label className="form-label label">Food name</label>
          <input className="form-control input" value={form.name} onChange={set("name")} placeholder="e.g. Veg Biryani" required />
        </div>

        <div className="grid-2">
          <div>
            <label className="form-label label">Food type</label>
            <select className="form-select select" value={form.foodType} onChange={set("foodType")}>
              {FOOD_TYPES.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="form-label label">Category</label>
            <select className="form-select select" value={form.category} onChange={set("category")}>
              {CATEGORIES.filter((c) => c.id !== "all").map((c) => (
                <option key={c.id} value={c.id}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label className="form-label label">Quantity</label>
            <input className="form-control input" value={form.quantity} onChange={set("quantity")} placeholder="e.g. 10 portions" required />
          </div>
          <div>
            <label className="form-label label">Pickup location</label>
            <input className="form-control input" value={form.location} onChange={set("location")} placeholder="e.g. Park Street, Kolkata" required />
          </div>
        </div>

        <div className="grid-2">
          <div>
            <label className="form-label label">Pickup time</label>
            <input className="form-control input" value={form.pickupTime} onChange={set("pickupTime")} placeholder="e.g. Today, 6–9 PM" />
          </div>
          <div>
            <label className="form-label label">Best before</label>
            <input className="form-control input" value={form.expiry} onChange={set("expiry")} placeholder="e.g. Today, 10 PM" />
          </div>
        </div>

        <div>
          <label className="form-label label">Description</label>
          <textarea className="form-control textarea" value={form.description} onChange={set("description")} placeholder="Anything people should know — ingredients, spice level, packaging…" />
        </div>

        {error && <p className="alert alert-danger form-error">{error}</p>}

        <button type="submit" className="btn btn-primary btn-block">
          Post Donation
        </button>
      </form>
    </div>
  );
}
