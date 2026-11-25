import { useState } from "react";
import { Check, X, PackageCheck } from "lucide-react";
import { listRequests, setRequestStatus } from "../../services/donations";

const STATUS_STYLE = {
  pending: "badge badge-almost",
  approved: "badge badge-available",
  collected: "badge badge-claimed",
};

export default function AdminRequests() {
  const [, setTick] = useState(0);
  const requests = listRequests();

  const update = (id, status) => {
    setRequestStatus(id, status);
    setTick((t) => t + 1);
  };

  return (
    <div>
      <h1 className="dash-title">Food Requests</h1>
      <p className="dash-sub">Claims made by users — approve or mark as collected.</p>

      {requests.length === 0 ? (
        <div className="card empty" style={{ marginTop: 22 }}>
          <span className="emoji">📭</span>
          <h3>No requests yet</h3>
          <p>When users claim food, their requests will appear here.</p>
        </div>
      ) : (
        <div className="card table-card table-responsive" style={{ marginTop: 22 }}>
          <table className="table table-hover align-middle mb-0 hf-table">
            <thead>
              <tr>
                <th>Food</th>
                <th>Requested by</th>
                <th>Donor</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {requests.map((r) => (
                <tr key={r.id}>
                  <td className="cell-main">{r.foodName}</td>
                  <td>
                    <div className="cell-main">{r.userName}</div>
                    <div className="cell-sub">{r.userEmail}</div>
                  </td>
                  <td>{r.donorName}</td>
                  <td>
                    <span className={STATUS_STYLE[r.status] || "badge"}>{r.status}</span>
                  </td>
                  <td>
                    <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                      {r.status === "pending" && (
                        <>
                          <button className="btn btn-primary" style={{ padding: "7px 12px", fontSize: 13 }} onClick={() => update(r.id, "approved")}>
                            <Check size={14} /> Approve
                          </button>
                          <button className="btn btn-danger" style={{ padding: "7px 12px", fontSize: 13 }} onClick={() => update(r.id, "declined")}>
                            <X size={14} /> Decline
                          </button>
                        </>
                      )}
                      {r.status === "approved" && (
                        <button className="btn btn-secondary" style={{ padding: "7px 12px", fontSize: 13 }} onClick={() => update(r.id, "collected")}>
                          <PackageCheck size={14} /> Collected
                        </button>
                      )}
                      {(r.status === "collected" || r.status === "declined") && <span className="cell-sub">done</span>}
                    </div>
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
