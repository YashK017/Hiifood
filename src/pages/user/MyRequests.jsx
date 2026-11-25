import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { listMyRequests } from "../../services/donations";

const STATUS_STYLE = {
  pending: "badge badge-almost",
  approved: "badge badge-available",
  collected: "badge badge-claimed",
};

export default function MyRequests() {
  const { user } = useAuth();
  const requests = listMyRequests(user);

  return (
    <div>
      <h1 className="dash-title">My Requests</h1>
      <p className="dash-sub">Food you've claimed from donors.</p>

      {requests.length === 0 ? (
        <div className="card empty" style={{ marginTop: 22 }}>
          <span className="emoji">🙌</span>
          <h3>No requests yet</h3>
          <p>Browse food near you and claim what you need.</p>
          <Link to="/browse" className="btn btn-primary">
            Find food
          </Link>
        </div>
      ) : (
        <div className="card table-card table-responsive" style={{ marginTop: 22 }}>
          <table className="table table-hover align-middle mb-0 hf-table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Donor</th>
                <th>Requested on</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td className="cell-main">{r.foodName}</td>
                  <td>{r.donorName}</td>
                  <td>{new Date(r.createdAt).toLocaleDateString()}</td>
                  <td>
                    <span className={STATUS_STYLE[r.status] || "badge"}>{r.status}</span>
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
