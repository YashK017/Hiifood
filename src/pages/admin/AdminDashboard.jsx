import { Link } from "react-router-dom";
import { listUsers } from "../../services/auth";
import { listDonations, listRequests } from "../../services/donations";
import { StatusBadge } from "../../components/FoodCard";

export default function AdminDashboard() {
  const users = listUsers();
  const donations = listDonations();
  const requests = listRequests();

  const stats = [
    { value: users.length, label: "Registered users" },
    { value: donations.length, label: "Total listings" },
    { value: donations.filter((d) => d.status === "available" || d.status === "almost").length, label: "Available now" },
    { value: requests.length, label: "Food requests" },
  ];

  return (
    <div>
      <h1 className="dash-title">
        Admin Dashboard<span className="admin-tag">Admin</span>
      </h1>
      <p className="dash-sub">A quick look at everything happening on HiiFood.</p>

      <div className="grid-4" style={{ marginTop: 24 }}>
        {stats.map((s) => (
          <div key={s.label} className="card stat-card">
            <div className="value">{s.value}</div>
            <div className="label2">{s.label}</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginTop: 24, padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 style={{ fontSize: 19 }}>Latest listings</h2>
          <Link to="/admin/donations" className="btn btn-outline" style={{ padding: "8px 16px", fontSize: 13 }}>
            Manage all
          </Link>
        </div>
        <div className="table-card" style={{ marginTop: 10 }}>
          <table className="table table-hover align-middle mb-0 hf-table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Donor</th>
                <th>Quantity</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.slice(0, 6).map((d) => (
                <tr key={d.id}>
                  <td className="cell-main">{d.name}</td>
                  <td>{d.donor.name}</td>
                  <td>{d.quantity}</td>
                  <td>
                    <StatusBadge status={d.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
