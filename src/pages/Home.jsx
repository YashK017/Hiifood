import { Link } from "react-router-dom";
import { HandHeart, Search, MessageCircle, ArrowRight } from "lucide-react";
import { PublicLayout } from "../components/Layout";
import FoodCard from "../components/FoodCard";
import { FOODS, IMPACT_STATS } from "../data/foods";

const STEPS = [
  {
    num: "01",
    icon: HandHeart,
    title: "Share",
    text: "Post your extra food in under a minute — a photo, quantity and pickup time is all it takes.",
  },
  {
    num: "02",
    icon: Search,
    title: "Discover",
    text: "People nearby browse available food and claim what they need, free of charge.",
  },
  {
    num: "03",
    icon: MessageCircle,
    title: "Connect",
    text: "Coordinate pickup directly. Good food reaches someone instead of the bin.",
  },
];

export default function Home() {
  return (
    <PublicLayout>
      <section className="hero">
        <div className="container"><div className="row g-5 align-items-center">
          <div className="col-lg-6">
            <span className="eyebrow">Share extra food · Help someone</span>
            <h1>Good Food Should Never Go to Waste.</h1>
            <p className="lead">
              Share extra meals with people who need them. HiiFood makes food
              sharing simple, local and human.
            </p>
            <div className="hero-cta">
              <Link to="/signup" className="btn btn-primary">
                Share Food <ArrowRight size={16} />
              </Link>
              <Link to="/browse" className="btn btn-outline">
                Find Food
              </Link>
            </div>
          </div>
          <div className="col-lg-6 hero-media">
            <img src="/images/hero-meal.jpg" alt="A warm shared meal" />
            <div className="hero-badge">
              <span className="dot" /> 24 meals shared today
            </div>
          </div>
        </div>
        </div>
      </section>

      <section className="section">
        <div className="container grid-4">
          {IMPACT_STATS.map((s) => (
            <div key={s.label} className="card stat-card">
              <div className="value">{s.value}</div>
              <div className="label2">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">How it works</span>
            <h2>Three steps to zero waste</h2>
          </div>
          <div className="grid-3">
            {STEPS.map(({ num, icon: Icon, title, text }) => (
              <div key={num} className="card card-hover step-card">
                <div className="num">{num}</div>
                <h3 style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <Icon size={20} color="var(--primary)" /> {title}
                </h3>
                <p style={{ color: "var(--muted)", marginTop: 8, fontSize: 14 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Fresh near you</span>
            <h2>Featured food today</h2>
          </div>
          <div className="row g-4 row-cols-1 row-cols-sm-2 row-cols-lg-3">
            {FOODS.slice(0, 6).map((f) => (
              <FoodCard key={f.id} food={f} />
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: 28 }}>
            <Link to="/browse" className="btn btn-secondary">
              Browse all food
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div
            className="card"
            style={{ padding: "48px 30px", textAlign: "center", background: "var(--peach)" }}
          >
            <h2 style={{ fontSize: 28 }}>Have extra food?</h2>
            <p style={{ color: "var(--muted)", marginTop: 8 }}>
              Someone nearby might need it.
            </p>
            <Link to="/signup" className="btn btn-primary" style={{ marginTop: 20 }}>
              Donate Food
            </Link>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
