# AuthSphere - Modern MERN Stack Authentication with Google OAuth 2.0

A full-stack, secure, production-ready authentication platform built using **React**, **Tailwind CSS**, **Node.js**, **Express**, **MongoDB**, and **Google OAuth 2.0**.

---

## 🌟 Key Features

- **🔐 Dual Authentication Modes**:
  - **Local Credentials**: Secure email and password registration and login with **Bcrypt (10 salt rounds)** password hashing.
  - **Google OAuth 2.0**: One-click Google Sign-In with server-side ID token verification, automatic account linking, and avatar synchronization.
- **🛡️ JWT Bearer Authorization**:
  - Stateless JSON Web Tokens sent via standard `Authorization: Bearer <token>` headers and cookies.
  - Automatic token expiration handling and Axios request/response interceptors.
- **⚡ Protected Routes & Role Management**:
  - Route guards on React Router for guest-only pages (`/login`, `/signup`) and authenticated pages (`/dashboard`, `/profile`).
- **🎨 Glassmorphic & Modern UI**:
  - Built with **Tailwind CSS**, Google Fonts (*Plus Jakarta Sans* & *Outfit*), subtle neon glows, smooth micro-animations, and responsive cards.
  - Real-time **Password Strength Meter** with live criteria checklist.
  - Interactive **JWT Token Inspector** and **Live MongoDB Document Viewer**.
  - Custom avatar customizer with multiple Dicebear presets.
- **📦 Clean Separation of Concerns**:
  - Modular backend architecture: Models, Controllers, Middleware, Routes, and Database config.
  - Modular frontend: Context, Custom Hooks, API Services, Route Guards, and UI Components.

---

## 📂 Project Structure

```
auth-app/
├── package.json               # Root scripts for running server & client concurrently
├── server/                    # Backend (Node.js + Express + MongoDB)
│   ├── config/
│   │   └── db.js              # Mongoose MongoDB connection
│   ├── controllers/
│   │   └── authController.js  # Register, Login, GoogleAuth, Me, Profile, Password, Logout
│   ├── middleware/
│   │   └── authMiddleware.js  # JWT Bearer verification middleware
│   ├── models/
│   │   └── User.js            # User Mongoose schema with Bcrypt pre-save hooks
│   ├── routes/
│   │   └── authRoutes.js      # REST API endpoints
│   ├── .env                   # Server environment variables
│   ├── .env.example
│   ├── package.json
│   └── server.js              # Express server entry point
│
└── client/                    # Frontend (React 19 + Vite + Tailwind CSS)
    ├── src/
    │   ├── components/
    │   │   ├── GoogleAuthButton.jsx       # Google Sign-In button & Cloud setup guide
    │   │   ├── PasswordStrengthMeter.jsx  # Live password strength indicator
    │   │   ├── RouteGuards.jsx            # ProtectedRoute & PublicRoute guards
    │   │   ├── Navbar.jsx                 # Glassmorphic header with user dropdown
    │   │   ├── Footer.jsx                 # Modern footer with stack tags
    │   │   └── Toast.jsx                  # Floating status notifications
    │   ├── context/
    │   │   └── AuthContext.jsx            # Global auth state, actions, and persistence
    │   ├── pages/
    │   │   ├── Home.jsx                   # Hero landing page & architecture map
    │   │   ├── Login.jsx                  # Sign in with email or Google & quick demo autofill
    │   │   ├── Signup.jsx                 # Registration with password meter & confetti
    │   │   ├── Dashboard.jsx              # Protected user metrics, JWT inspector & DB viewer
    │   │   ├── Profile.jsx                # Profile editor, avatar picker & password update
    │   │   └── NotFound.jsx               # 404 page
    │   ├── services/
    │   │   └── api.js                     # Axios instance with auth interceptors
    │   ├── App.jsx
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── .env.example
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher)
- **MongoDB** running locally on port `27017` or a MongoDB Atlas connection string.

### 2. Start Both Frontend and Backend Concurrently
From the root directory (`auth-app`), run:

```bash
npm run dev
```

This will automatically launch:
- 🚀 **Backend Server**: `http://localhost:5000`
- 💻 **Frontend Web App**: `http://localhost:5173`

---

## 🔑 Environment Variables Configuration

### Backend (`server/.env`)
```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/auth_db
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CLIENT_URL=http://localhost:5173
# Optional: Set your Google OAuth 2.0 Client ID for strict server-side cryptographic token verification
GOOGLE_CLIENT_ID=
```

### Frontend (`client/.env`)
```env
VITE_API_URL=/api
# Optional: Set your Google OAuth 2.0 Client ID from Google Cloud Console
VITE_GOOGLE_CLIENT_ID=
```

---

## 🌐 Setting Up Google OAuth 2.0 (Optional)

The application includes an integrated **Google Authentication Simulator** for instant testing out-of-the-box. To connect your live Google Cloud project:

1. Go to the [Google Cloud Console Credentials](https://console.cloud.google.com/apis/credentials).
2. Create an **OAuth 2.0 Client ID** with Application Type: **Web application**.
3. Under **Authorized JavaScript Origins**, add:
   - `http://localhost:5173`
   - `http://localhost:5000`
4. Copy the generated **Client ID** and paste it into:
   - `client/.env` -> `VITE_GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com`
   - `server/.env` -> `GOOGLE_CLIENT_ID=your_id.apps.googleusercontent.com`
5. Restart the dev server!

---

## 📡 REST API Documentation

| Method | Endpoint | Access | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/auth/register` | Public | Register new user with email, name, password |
| `POST` | `/api/auth/login` | Public | Login with email and password |
| `POST` | `/api/auth/google` | Public | Authenticate or sign up with Google ID token |
| `POST` | `/api/auth/logout` | Public | Clear session cookie and logout |
| `GET` | `/api/auth/me` | Private | Retrieve authenticated user's profile |
| `PUT` | `/api/auth/profile` | Private | Update user's name, avatar URL, or bio |
| `PUT` | `/api/auth/change-password`| Private | Change password for email/password users |
| `GET` | `/api/health` | Public | Server and DB health check |

---

## 🛡️ Security Highlights

- **Salting & Hashing**: Passwords are never saved in plaintext; hashed via `bcryptjs` with salt factor 10.
- **Safe Serialization**: The `password` field is omitted using Mongoose `select: true` and stripped in schema `toJSON()`.
- **JWT Protection**: Secure verification middleware checks expiration and signature on all private endpoints.
- **Sanitized Inputs**: Strict email regex and validator format checks before MongoDB persistence.
