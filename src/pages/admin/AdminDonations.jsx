import { useState } from "react";
import { Trash2 } from "lucide-react";
import { listDonations, removeDonation } from "../../services/donations";
import { StatusBadge } from "../../components/FoodCard";

export default function AdminDonations() {
  const [, setTick] = useState(0);
  const donations = listDonations();

  return (
    <div>
      <h1 className="dash-title">All Donations</h1>
      <p className="dash-sub">
        Every listing on the platform. Sample listings can't be removed; user posts can.
      </p>

      <div className="card table-card table-responsive" style={{ marginTop: 22 }}>
        <table className="table table-hover align-middle mb-0 hf-table">
          <thead>
            <tr>
              <th>Food</th>
              <th>Donor</th>
              <th>Type</th>
              <th>Quantity</th>
              <th>Status</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {donations.map((d) => {
              const isLocal = d.id.startsWith("local-");
              return (
                <tr key={d.id}>
                  <td>
                    <div className="cell-main">{d.name}</div>
                    <div className="cell-sub">{d.location}</div>
                  </td>
                  <td>{d.donor.name}</td>
                  <td>{d.foodType}</td>
                  <td>{d.quantity}</td>
                  <td>
                    <StatusBadge status={d.status} />
                  </td>
                  <td>
                    {isLocal ? (
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
                    ) : (
                      <span className="cell-sub">sample</span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
