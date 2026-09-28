# Leela Travels - Luxury Sri Lankan Route Discovery & Private Transfer Platform

A modern, high-performance Web application MVP built for **Leela Travels**, offering 10 iconic Sri Lankan chauffeur routes, interactive 2-image sliding route discovery, a streamlined 4-step booking reservation wizard, real-time Cloud Firestore integration, and an Operations Control Center Admin Portal protected by Firebase Authentication.

---

## 🌟 Key Features

1. **Route Catalog & Filtering**:
   - 10 curated Sri Lankan transfer routes across Hill Country, Coastal, Cultural Triangle, and Safari categories.
   - Interactive 2-image auto-sliding card galleries (3-second intervals & manual chevron controls).
   - Category filtering, origin selection, price range sliders, and detailed modal view.

2. **Streamlined 4-Step Reservation Wizard**:
   - **Step 1:** Journey selection.
   - **Step 2:** Schedule, pickup time, and vehicle category choice (Sedan, SUV, Passenger Van) with dynamic rate calculation and real-time validation checks (past time prevention & vehicle capacity enforcement).
   - **Step 3:** Customer contact details & pickup address.
   - **Step 4:** Reservation verification & Cloud Firestore submission.

3. **Cloud Database Integration**:
   - Direct integration with Firebase Cloud Firestore (`bookings` collection).
   - Offline fallback mechanism for zero-downtime booking logging.

4. **Operations Admin Portal (`/admin`)**:
   - Protected by Firebase Authentication (Email & Password).
   - Real-time reservation status updates (Pending, Confirmed, Completed, Cancelled).
   - Filter & search reservations by Ref ID, customer name, phone, or route.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React
- **Backend & Cloud:** Firebase Firestore, Firebase Authentication
- **Effects & UI:** Canvas Confetti, CSS Glassmorphism & Micro-animations

---

## 🚀 Quick Start & Installation

### 1. Clone Repository
```bash
git clone https://github.com/your-username/leela-travels.git
cd leela-travels
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Environment Variables (Optional)
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```
*(Note: Default fallback Firebase credentials are pre-configured in `src/config/firebase.ts` so the project runs immediately out-of-the-box for evaluation).*

### 4. Run Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:5173`.

---

## 🔑 Admin Portal Credentials

To access the restricted **Operations Admin Portal** at `/admin`:

- **URL:** `http://localhost:5173/admin`
- **Admin Email:** `admin@gmail.com`
- **Admin Password:** `Admin123`

---

## 📁 Project Structure

```
c:\Office\Assignment\
├── public/
│   ├── assets/           # Route & Brand images
│   └── favicon.svg
├── src/
│   ├── components/       # Navbar, Footer, RouteCard, RouteDetailsModal
│   ├── config/           # Firebase App, Firestore, Auth config
│   ├── context/          # AdminAuthContext provider
│   ├── data/             # Sri Lankan routes & vehicle options data
│   ├── pages/            # HomePage, RoutesPage, BookingPage, AdminPage
│   ├── services/         # Firestore booking service & offline fallback
│   └── types/            # TypeScript interfaces
├── .env.example
├── README.md
└── vite.config.ts
```
