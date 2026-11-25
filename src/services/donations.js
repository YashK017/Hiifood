// Donations & requests service — localStorage-backed, same swap-later idea
// as auth.js. Sample listings come from src/data/foods.js.

import { FOODS } from "../data/foods";

const DONATIONS_KEY = "hiifood_donations";
const REQUESTS_KEY = "hiifood_requests";

function read(key) {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch {
    return [];
  }
}

function write(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* ---------------- Donations ---------------- */

export function listDonations() {
  // User-posted donations first, then the sample listings.
  return [...read(DONATIONS_KEY), ...FOODS];
}

export function getDonation(id) {
  return listDonations().find((d) => d.id === id);
}

export function listMyDonations(user) {
  if (!user) return [];
  return read(DONATIONS_KEY).filter((d) => d.ownerEmail === user.email);
}

export function createDonation(input, user) {
  const item = {
    id: `local-${Date.now()}`,
    name: input.name,
    image: "/images/food-biryani.jpg", // default photo for user posts
    description: input.description || "Shared through HiiFood.",
    category: input.category || "meals",
    foodType: input.foodType,
    vegetarian: true,
    donor: { name: user?.name || "You", type: "Home", rating: 5 },
    distanceKm: 0.4,
    quantity: input.quantity,
    portions: parseInt(input.quantity, 10) || 1,
    pickupTime: input.pickupTime || "Today",
    expiry: input.expiry || "Today",
    location: input.location || "Your location",
    status: "available",
    ownerEmail: user?.email,
    createdAt: new Date().toISOString(),
  };
  write(DONATIONS_KEY, [item, ...read(DONATIONS_KEY)]);
  return item;
}

export function removeDonation(id) {
  write(
    DONATIONS_KEY,
    read(DONATIONS_KEY).filter((d) => d.id !== id)
  );
}

export function markDonationClaimed(id) {
  const items = read(DONATIONS_KEY).map((d) =>
    d.id === id ? { ...d, status: "claimed" } : d
  );
  write(DONATIONS_KEY, items);
}

/* ---------------- Requests (claims) ---------------- */

export function listRequests() {
  return read(REQUESTS_KEY);
}

export function listMyRequests(user) {
  if (!user) return [];
  return read(REQUESTS_KEY).filter((r) => r.userEmail === user.email);
}

export function createRequest(food, user) {
  const requests = read(REQUESTS_KEY);
  if (requests.some((r) => r.foodId === food.id && r.userEmail === user.email)) {
    throw new Error("You already requested this food.");
  }
  const req = {
    id: `req-${Date.now()}`,
    foodId: food.id,
    foodName: food.name,
    donorName: food.donor.name,
    userName: user.name,
    userEmail: user.email,
    status: "pending", // pending | approved | collected
    createdAt: new Date().toISOString(),
  };
  write(REQUESTS_KEY, [req, ...requests]);
  return req;
}

export function setRequestStatus(id, status) {
  write(
    REQUESTS_KEY,
    read(REQUESTS_KEY).map((r) => (r.id === id ? { ...r, status } : r))
  );
}
