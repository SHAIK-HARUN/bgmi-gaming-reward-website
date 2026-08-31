# BATTLEGROUNDS MOBILE INDIA - Gaming Event & Reward Website

A modern, premium, fully responsive BGMI event reward web application built with **React**, **Vite**, **Tailwind CSS**, **Node.js/Express**, and **Firebase**.

Inspired by official esports battle royale reference designs, featuring real-time countdowns, dual reward claiming, secure OAuth authentication, account verification, and a protected Admin Dashboard.

---

## 🌟 Key Features

1. **Esports Theme & Aesthetics**: Dark slate/black gaming palette (`#0a0b0d`), esports gold accents (`#f5b800`), crimson red glows, and custom typography (`Teko`, `Rajdhani`).
2. **Real-time Countdown Timer**: Live ticking countdown timer ("Rewards will be available until") with auto-expiration detection showing "Event Expired".
3. **Dual Reward Claiming**:
   - **UP Series Reward**: 10 Upgrade Materials with high-resolution gaming graphic.
   - **UC Reward**: 6000+ FREE +2100 UC currency card with starburst bonus badge.
4. **Complete User Flow**:
   `Collect Reward` ➔ `Reward Confirmation Modal` ➔ `Secure OAuth Login` ➔ `Account Verification Form` ➔ `Processing Status Screen`
5. **Secure OAuth Authentication**: Built with Firebase Auth supporting Google, Facebook, and Twitter/X OAuth popups. *Never captures third-party passwords.*
6. **Account Verification**: Strict input validation for Player ID (8-12 digits), Phone Number, and Account Level (1-100).
7. **Protected Admin Dashboard (`/admin`)**:
   - Protected passcode authentication (`admin123`).
   - Real-time submission counters and status metrics.
   - Search & filter by Player ID, Phone Number, Reward Type, or Status.
   - Action controls: Approve, Reject, Delete, and Export CSV reports.
8. **Mobile-First Responsiveness**: Tested across all standard screen sizes (360px, 375px, 390px, 412px, 768px, 1024px, 1440px).

---

## 📁 Project Architecture

```
Gaming & Reward Website/
├── public/
├── server/
│   ├── index.js              # Express server setup (CORS, security headers, static serve)
│   └── routes/
│       └── api.js            # Submissions API & Admin endpoints
├── src/
│   ├── assets/
│   │   ├── hero_banner.png   # Esports hero artwork
│   │   ├── upgrade_reward.png# UP Series 10 reward graphic
│   │   └── uc_reward.png     # 6000+ UC reward graphic
│   ├── components/
│   │   ├── Header.jsx        # Navigation bar & social links
│   │   ├── HeroBanner.jsx    # Hero graphic banner
│   │   ├── CountdownTimer.jsx# Configurable live countdown
│   │   ├── SocialLoginBar.jsx# Social quick login bar
│   │   ├── RewardSection.jsx # Dual reward cards
│   │   ├── RewardModal.jsx   # Confirmation popup
│   │   ├── AuthModal.jsx     # Firebase OAuth modal
│   │   ├── VerificationModal.jsx # Account verification form
│   │   ├── StatusScreen.jsx  # Processing status page
│   │   └── Footer.jsx        # KRAFTON official theme footer
│   ├── pages/
│   │   └── AdminDashboard.jsx# Admin management portal
│   ├── services/
│   │   └── firebase.js       # Firebase SDK & Auth providers
│   ├── App.jsx               # Application state machine & modal router
│   ├── main.jsx              # React DOM entry
│   └── index.css             # Tailwind CSS & gaming styles
├── .env.example              # Environment variables template
├── package.json              # Project dependencies
├── tailwind.config.js        # Theme tokens & custom fonts
└── vite.config.js            # Vite configuration & server proxy
```

---

## 🚀 Quick Start (Local Development)

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment Variables
Copy `.env.example` to `.env`:
```env
PORT=5000
ADMIN_PASSWORD=admin123
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
```

### 3. Run Development Servers

- **Frontend (Vite)**:
```bash
npm run dev
```
Open `http://localhost:3000` in your browser.

- **Fullstack / Backend (Node + Express)**:
```bash
npm start
```
Open `http://localhost:5000` in your browser.

---

## 🌐 Netlify & Online Deployment Instructions

### Deploying Frontend to Netlify

1. Log in to [Netlify](https://www.netlify.com/).
2. Click **Add new site** ➔ **Import an existing project**.
3. Connect your GitHub repository containing this codebase.
4. Set Build Settings:
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
5. Add Environment Variables in Netlify settings (`VITE_FIREBASE_API_KEY`, etc.).
6. Click **Deploy Site**. Netlify will provision an HTTPS subdomain (e.g. `https://bgmi-rewards-event.netlify.app`).

### Deploying Express Backend to Render / Railway

1. Push code to GitHub.
2. Create a Web Service on [Render.com](https://render.com).
3. Set **Build Command**: `npm install`
4. Set **Start Command**: `node server/index.js`
5. Add `ADMIN_PASSWORD` and Firebase environment variables in Render environment settings.

---

## 📱 Mobile & Desktop Viewport Test Report

| Viewport Width | Device Category | Status | Visual Integrity |
| :--- | :--- | :---: | :--- |
| **360px** | Small Android (Galaxy S8) | ✅ Passed | Clean vertical card stacking, touch-friendly buttons |
| **375px** | iPhone SE / 12 Mini | ✅ Passed | Modals centered, zero horizontal overflow |
| **390px** | iPhone 13 / 14 / 15 | ✅ Passed | Sharp artwork scaling and readable fonts |
| **412px** | Pixel 7 / Samsung Ultra | ✅ Passed | Perfect alignment of header & social buttons |
| **768px** | iPad / Tablet | ✅ Passed | 2-column reward card grid with side branding |
| **1024px** | iPad Pro / Small Laptop | ✅ Passed | Full desktop header and expanded admin table |
| **1440px** | Full HD Desktop | ✅ Passed | Max-width container centering with dark gold glow |

---

## 🛡️ Security & Privacy Notice

This application enforces modern web security standards:
- **No Password Theft / Phishing**: Custom forms asking for third-party account passwords are prohibited. All social logins utilize official Firebase OAuth 2.0 standard popups.
- **Server Validation**: Input length and regex checks sanitize Player ID, Phone, and Level parameters.
- **Security Headers**: `X-Content-Type-Options`, `X-Frame-Options`, and `X-XSS-Protection` headers enabled.
