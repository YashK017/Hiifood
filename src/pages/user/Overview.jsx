import { Link } from "react-router-dom";
import { PlusCircle } from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { listMyDonations, listMyRequests } from "../../services/donations";
import { StatusBadge } from "../../components/FoodCard";

export default function Overview() {
  const { user } = useAuth();
  const donations = listMyDonations(user);
  const requests = listMyRequests(user);
  const active = donations.filter((d) => d.status === "available").length;

  const stats = [
    { value: donations.length, label: "Donations posted" },
    { value: active, label: "Active listings" },
    { value: requests.length, label: "Food requested" },
    { value: `${donations.reduce((s, d) => s + (d.portions || 0), 0)}`, label: "Portions shared" },
  ];

  return (
    <div>
      <h1 className="dash-title">Hi {user?.name?.split(" ")[0]} 👋</h1>
      <p className="dash-sub">Here's what's happening with your food sharing.</p>

      <div className="grid-4" style={{ marginTop: 24 }}>
        {stats.map((s) => (
          <div key={s.label} className="card stat-card">
            <div className="value">{s.value}</div>
            <div className="label2">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 10 }}>
          <h2 style={{ fontSize: 19 }}>Recent donations</h2>
          <Link to="/dashboard/add" className="btn btn-primary" style={{ padding: "9px 18px", fontSize: 14 }}>
            <PlusCircle size={15} /> Add donation
          </Link>
        </div>

        {donations.length === 0 ? (
          <div className="empty">
            <span className="emoji">🍲</span>
            <p>You haven't posted any food yet. Share your first extra meal!</p>
          </div>
        ) : (
          <div className="table-card" style={{ marginTop: 12 }}>
            <table className="table table-hover align-middle mb-0 hf-table">
              <thead>
                <tr>
                  <th>Food</th>
                  <th>Quantity</th>
                  <th>Pickup</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {donations.slice(0, 5).map((d) => (
                  <tr key={d.id}>
                    <td className="cell-main">{d.name}</td>
                    <td>{d.quantity}</td>
                    <td>{d.pickupTime}</td>
                    <td>
                      <StatusBadge status={d.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
