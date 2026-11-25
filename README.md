# HiiFood — React + Vite

A food-sharing platform built with **React, Vite and Bootstrap 5 + custom CSS theme** — no backend.
Login, signup, donations and requests are all stored in the browser's
**localStorage**, so the app runs fully offline after `npm install`.

## Run it (VS Code)

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Demo accounts

| Role  | Email             | Password    | Lands on      |
| ----- | ----------------- | ----------- | ------------- |
| User  | demo@hiifood.com  | password123 | /dashboard    |
| Admin | admin@hiifood.com | admin123    | /admin        |

New signups are always regular **users**. The admin account is seeded
automatically on first load.

## Modules

- **User module** (`/dashboard`) — overview stats, post a donation, manage
  your donations, track your food requests.
- **Admin module** (`/admin`) — site-wide stats, manage users, view/remove
  donations, approve or decline food requests.
- **Public pages** — home, browse/find food with filters, food details with
  claiming, login, signup.

## Project structure

```
src/
├── main.jsx              # entry point
├── App.jsx               # routes + auth guards (RequireAuth / RequireAdmin)
├── index.css             # whole design system (Bootstrap 5 + custom CSS theme)
├── context/
│   └── AuthContext.jsx   # session state, login/signup/logout
├── services/
│   ├── auth.js           # localStorage auth (users + session)
│   └── donations.js      # localStorage donations + requests
├── data/
│   └── foods.js          # sample listings + categories
├── components/
│   ├── Layout.jsx        # header, footer, logo
│   └── FoodCard.jsx
└── pages/
    ├── Home.jsx, Browse.jsx, FoodDetails.jsx, Login.jsx, Signup.jsx
    ├── user/             # UserLayout, Overview, MyDonations, AddDonation, MyRequests
    └── admin/            # AdminLayout, AdminDashboard, AdminUsers, AdminDonations, AdminRequests
```

## Swapping in a real backend later

Only `src/services/auth.js` and `src/services/donations.js` talk to storage.
Replace those function bodies with API calls (REST, Firebase, Supabase…) and
the rest of the app keeps working unchanged.

> Note: localStorage auth is for demos/learning only — passwords are visible
> in the browser. Use a real backend before shipping to real users.
