import { useState } from "react";
import { Trash2 } from "lucide-react";
import { listUsers, deleteUser } from "../../services/auth";
import { useAuth } from "../../context/AuthContext";

export default function AdminUsers() {
  const { user: me } = useAuth();
  const [, setTick] = useState(0);
  const users = listUsers();

  return (
    <div>
      <h1 className="dash-title">Users</h1>
      <p className="dash-sub">Everyone who has signed up on this device.</p>

      <div className="card table-card table-responsive" style={{ marginTop: 22 }}>
        <table className="table table-hover align-middle mb-0 hf-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Joined</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td className="cell-main">{u.name}</td>
                <td>{u.email}</td>
                <td>
                  <span className={u.role === "admin" ? "badge badge-admin" : "badge badge-user"}>{u.role}</span>
                </td>
                <td>{u.joined}</td>
                <td>
                  {u.id !== me?.id && u.role !== "admin" ? (
                    <button
                      className="btn btn-danger"
                      style={{ padding: "7px 12px", fontSize: 13 }}
                      onClick={() => {
                        deleteUser(u.id);
                        setTick((t) => t + 1);
                      }}
                    >
                      <Trash2 size={14} /> Remove
                    </button>
                  ) : (
                    <span className="cell-sub">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
