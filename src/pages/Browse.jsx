import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { PublicLayout } from "../components/Layout";
import FoodCard from "../components/FoodCard";
import { listDonations } from "../services/donations";
import { CATEGORIES } from "../data/foods";

export default function Browse() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [availableOnly, setAvailableOnly] = useState(false);

  const foods = useMemo(() => {
    let items = listDonations();
    if (category !== "all") items = items.filter((f) => f.category === category);
    if (availableOnly)
      items = items.filter((f) => f.status === "available" || f.status === "almost");
    if (query.trim()) {
      const q = query.toLowerCase();
      items = items.filter(
        (f) =>
          f.name.toLowerCase().includes(q) ||
          f.donor.name.toLowerCase().includes(q) ||
          f.location.toLowerCase().includes(q)
      );
    }
    return items;
  }, [query, category, availableOnly]);

  return (
    <PublicLayout>
      <div className="container page-head">
        <span className="eyebrow">Find food</span>
        <h1>Find Food Near You</h1>
        <p>Browse food shared by donors around you — always free.</p>
      </div>

      <div className="container">
        <div className="filter-bar">
          <div style={{ position: "relative", flex: "1 1 240px" }}>
            <Search
              size={16}
              style={{ position: "absolute", left: 14, top: "50%", transform: "translateY(-50%)", color: "var(--muted)" }}
            />
            <input
              className="form-control input"
              style={{ paddingLeft: 38 }}
              placeholder="Search food, donor or area…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600 }}>
            <input
              type="checkbox" className="form-check-input"
              checked={availableOnly}
              onChange={(e) => setAvailableOnly(e.target.checked)}
            />
            Available now
          </label>
        </div>

        <div className="filter-bar" style={{ marginTop: 0 }}>
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              className={category === c.id ? "chip chip-active" : "chip"}
              onClick={() => setCategory(c.id)}
            >
              {c.label}
            </button>
          ))}
        </div>

        {foods.length === 0 ? (
          <div className="empty">
            <span className="emoji">🍽️</span>
            <h3>No food matches your filters</h3>
            <p>Try a different search or category.</p>
            <button
              className="btn btn-outline"
              onClick={() => {
                setQuery("");
                setCategory("all");
                setAvailableOnly(false);
              }}
            >
              Reset filters
            </button>
          </div>
        ) : (
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3" style={{ paddingBottom: 40 }}>
            {foods.map((f) => (
              <FoodCard key={f.id} food={f} />
            ))}
          </div>
        )}
      </div>
    </PublicLayout>
  );
}
