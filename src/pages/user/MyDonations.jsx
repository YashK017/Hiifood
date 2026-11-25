import { useState } from "react";
import { Link } from "react-router-dom";
import { PlusCircle, Trash2 } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { listMyDonations, removeDonation } from "../../services/donations";
import { StatusBadge } from "../../components/FoodCard";

const TABS = [
  { id: "all", label: "All" },
  { id: "available", label: "Active" },
  { id: "claimed", label: "Claimed" },
];

export default function MyDonations() {
  const { user } = useAuth();
  const [tab, setTab] = useState("all");
  const [, setTick] = useState(0); // re-render after delete

  const all = listMyDonations(user);
  const items = tab === "all" ? all : all.filter((d) => d.status === tab);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
        <div>
          <h1 className="dash-title">My Donations</h1>
          <p className="dash-sub">Everything you've shared on HiiFood.</p>
        </div>
        <Link to="/dashboard/add" className="btn btn-primary">
          <PlusCircle size={16} /> Add Donation
        </Link>
      </div>

      <div className="filter-bar">
        {TABS.map((t) => (
          <button key={t.id} className={tab === t.id ? "chip chip-active" : "chip"} onClick={() => setTab(t.id)}>
            {t.label}
          </button>
        ))}
      </div>

      {items.length === 0 ? (
        <div className="card empty">
          <span className="emoji">🧺</span>
          <h3>Nothing here yet</h3>
          <p>Post your first donation and it will show up here.</p>
          <Link to="/dashboard/add" className="btn btn-primary">
            Add Donation
          </Link>
        </div>
      ) : (
        <div className="card table-card table-responsive">
          <table className="table table-hover align-middle mb-0 hf-table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Type</th>
                <th>Quantity</th>
                <th>Pickup</th>
                <th>Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {items.map((d) => (
                <tr key={d.id}>
                  <td>
                    <div className="cell-main">{d.name}</div>
                    <div className="cell-sub">{d.location}</div>
                  </td>
                  <td>{d.foodType}</td>
                  <td>{d.quantity}</td>
                  <td>{d.pickupTime}</td>
                  <td>
                    <StatusBadge status={d.status} />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger"
                      style={{ padding: "7px 12px", fontSize: 13 }}
                      onClick={() => {
                        removeDonation(d.id);
                        setTick((t) => t + 1);
                      }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
