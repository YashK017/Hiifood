// Auth service — everything runs on localStorage so the app works with no
// backend. Swap these function bodies for real API calls later; the rest of
// the app will not change.

const USERS_KEY = "hiifood_users";
const SESSION_KEY = "hiifood_session";

// Seeded accounts. The admin account is created on first load.
const SEED_USERS = [
  {
    id: "admin-1",
    name: "HiiFood Admin",
    email: "admin@hiifood.com",
    password: "admin123",
    role: "admin",
    joined: "2026-01-01",
  },
  {
    id: "user-1",
    name: "Yash Kumar",
    email: "demo@hiifood.com",
    password: "password123",
    role: "user",
    joined: "2026-01-15",
  },
];

function readUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY)) || [];
  } catch {
    return [];
  }
}

function writeUsers(users) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// Make sure the seed accounts exist (runs once per browser).
export function seedUsers() {
  const users = readUsers();
  let changed = false;
  for (const seed of SEED_USERS) {
    if (!users.some((u) => u.email === seed.email)) {
      users.push(seed);
      changed = true;
    }
  }
  if (changed) writeUsers(users);
}

export function listUsers() {
  seedUsers();
  // Never hand passwords to the UI.
  return readUsers().map(({ password, ...u }) => u);
}

export function signup({ name, email, password }) {
  seedUsers();
  const users = readUsers();
  email = email.trim().toLowerCase();

  if (!name.trim()) throw new Error("Please enter your name.");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    throw new Error("Please enter a valid email address.");
  if (password.length < 6)
    throw new Error("Password must be at least 6 characters.");
  if (users.some((u) => u.email === email))
    throw new Error("An account with this email already exists. Please log in.");

  const user = {
    id: `user-${Date.now()}`,
    name: name.trim(),
    email,
    password,
    role: "user", // signups are always regular users; admin is seeded only
    joined: new Date().toISOString().slice(0, 10),
  };
  users.push(user);
  writeUsers(users);

  const { password: _pw, ...safe } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  return safe;
}

export function login({ email, password }) {
  seedUsers();
  const users = readUsers();
  const user = users.find(
    (u) => u.email === email.trim().toLowerCase() && u.password === password
  );
  if (!user) throw new Error("Invalid email or password. Please try again.");

  const { password: _pw, ...safe } = user;
  localStorage.setItem(SESSION_KEY, JSON.stringify(safe));
  return safe;
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function getSession() {
  try {
    return JSON.parse(localStorage.getItem(SESSION_KEY));
  } catch {
    return null;
  }
}

export function deleteUser(id) {
  const users = readUsers().filter((u) => u.id !== id);
  writeUsers(users);
}
