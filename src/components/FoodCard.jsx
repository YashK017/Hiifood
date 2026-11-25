import { Link } from "react-router-dom";
import { MapPin, Clock, Users } from "lucide-react";
import { STATUS_LABELS } from "../data/foods";

export function StatusBadge({ status }) {
  return <span className={`badge badge-${status}`}>{STATUS_LABELS[status] || status}</span>;
}

export default function FoodCard({ food }) {
  return (
    <div className="col">
    <div className="card card-hover food-card h-100">
      <img src={food.image} alt={food.name} />
      <div className="food-card-body">
        <div style={{ display: "flex", justifyContent: "space-between", gap: 8, alignItems: "flex-start" }}>
          <h3>{food.name}</h3>
          <StatusBadge status={food.status} />
        </div>
        <div className="food-meta">
          <span>
            <Users size={14} /> {food.donor.name}
          </span>
          <span>
            <MapPin size={14} /> {food.distanceKm} km
          </span>
          <span>
            <Clock size={14} /> {food.pickupTime}
          </span>
        </div>
        <div className="food-card-foot">
          <span style={{ fontSize: 13, color: "var(--muted)" }}>{food.quantity}</span>
          <Link to={`/food/${food.id}`} className="btn btn-outline btn-sm" style={{ padding: "8px 16px", fontSize: 13 }}>
            View
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}
