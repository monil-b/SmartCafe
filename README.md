````md
# SmartCafe ☕🍔

A full-stack MERN café ordering platform with OTP authentication, Google login, admin dashboard, cart management, and secure production deployment.

---

# 🚀 Live Demo

## Frontend
https://smart-cafe-navy.vercel.app

## Backend API
https://smartcafe-rj4v.onrender.com

---

# ✨ Features

## 👤 Authentication
- User Registration with OTP Verification
- Login with OTP Verification
- Google Authentication
- Forgot Password & Reset Password
- JWT Authentication
- Protected Routes
- Role-Based Admin Access

## 🛒 Customer Features
- Browse Menu
- Search & Filter Products
- Add to Cart
- Remove from Cart
- Place Orders
- View Order History
- User Profile Management

## 🛠️ Admin Features
- Admin Dashboard
- Manage Products
- Manage Users
- Manage Orders
- Update Order Status
- Product Image Uploads

## 📧 Email Features
- OTP Verification Emails
- Password Reset Emails
- Brevo SMTP Integration

---

# 🏗️ Tech Stack

## Frontend
- React
- TypeScript
- Vite
- Tailwind CSS
- ShadCN UI
- React Router DOM
- Axios
- Sonner Toast

## Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

## Services
- Firebase Authentication
- Cloudinary
- Brevo SMTP
- MongoDB Atlas
- Render
- Vercel

---

# 📊 Performance & Quality Metrics

## Lighthouse Audit

| Metric | Score |
|----------|--------|
| 🚀 Performance | **100** |
| ♿ Accessibility | **100** |
| 🛡️ Best Practices | **100** |
| 🔍 SEO | **92** |

## Core Web Vitals

| Metric | Result |
|----------|---------|
| First Contentful Paint (FCP) | **0.4s** |
| Largest Contentful Paint (LCP) | **0.6s** |
| Total Blocking Time (TBT) | **0ms** |
| Cumulative Layout Shift (CLS) | **0.003** |
| Speed Index (SI) | **0.5s** |

## Backend Load Testing

Load testing performed using Autocannon on the deployed Render backend.

| Concurrent Connections | Avg Latency | Requests/sec |
|-----------------------|-------------|--------------|
| 10 | 526 ms | 18.75 |
| 50 | 690 ms | 72.5 |
| 100 | 898 ms | 109 |

## Performance Optimizations

- Parallel API requests using `Promise.all()`
- Optimized MongoDB queries using `lean()`
- Lazy-loaded images
- Lighthouse Accessibility Score of **100**
- Lighthouse Performance Score of **100**
- Optimized Admin Dashboard data fetching
- Responsive UI across mobile, tablet, and desktop devices

---

# 📂 Project Structure

```bash
SmartCafe
│
├── SmartCafe-BE
│   ├── src
│   ├── controllers
│   ├── models
│   ├── routes
│   ├── middleware
│   └── utils
│
└── SmartCafe-UI
    ├── src
    ├── components
    ├── pages
    ├── layouts
    ├── routes
    └── api
````

---

# ⚙️ Environment Variables

## Backend `.env`

```env
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

BREVO_EMAIL=
BREVO_PASS=

CLIENT_URL=
```

## Frontend `.env`

```env
VITE_API_URL=

VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

---

# 🖥️ Local Setup

## Clone Repository

```bash
git clone https://github.com/monil-b/SmartCafe.git
```

## Backend Setup

```bash
cd SmartCafe-BE
npm install
npm run dev
```

## Frontend Setup

```bash
cd SmartCafe-UI
npm install
npm run dev
```

---

# 🔐 Authentication Flow

## Register/Login

1. User enters credentials
2. OTP sent to email
3. User verifies OTP
4. JWT token generated
5. User authenticated

## Google Login

1. Firebase Popup Authentication
2. Backend Verification
3. JWT Token Generation
4. User Login

---

# 🌍 Deployment

## Frontend

* Hosted on Vercel

## Backend

* Hosted on Render

## Database

* MongoDB Atlas

## Media Storage

* Cloudinary

## Email Service

* Brevo SMTP

---

# 📱 Responsive Design

Fully responsive for:

* Mobile
* Tablet
* Desktop

---

# 🧠 What I Learned

* MERN Stack Development
* JWT Authentication
* OTP Verification Systems
* Google OAuth Integration
* Cloud Deployment
* Email Service Integration
* Cloudinary Media Storage
* Protected Routes
* Admin Dashboard Development
* API Optimization
* Performance Testing with Autocannon
* Lighthouse Performance Optimization
* Web Performance Optimization
* MongoDB Query Optimization using `lean()`
* Parallel Data Fetching using `Promise.all()`

---

# 📌 Future Improvements

* Online Payments
* Order Tracking
* Real-Time Notifications
* Product Reviews
* Pagination
* Advanced Analytics Dashboard
* Admin Statistics API

---

# 👨‍💻 Author

## Monil Babariya

* GitHub: https://github.com/monil-b
* LinkedIn: https://www.linkedin.com/in/monil-babariya-bb902b2a4/

---

# ⭐ Support

If you like this project, give it a star ⭐ on GitHub.

```
```
