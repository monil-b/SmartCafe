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
- User Registration
- Login with OTP Verification
- Google Authentication
- Forgot Password & Reset Password
- JWT Authentication
- Protected Routes
- Role-based Admin Access

## 🛒 Customer Features
- Browse Menu
- Search & Filter Products
- Add to Cart
- Place Orders
- Order History
- User Profile Management

## 🛠️ Admin Features
- Admin Dashboard
- Manage Products
- Manage Users
- Manage Orders
- Product Image Uploads

## 📧 Email Features
- OTP Verification Emails
- Password Reset Emails
- Brevo Email API Integration

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
- Firebase Google Authentication
- Cloudinary Image Upload
- Brevo Email API
- Render Deployment
- Vercel Deployment

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
```

---

# ⚙️ Environment Variables

## Backend `.env`

```env
MONGO_URI=
JWT_SECRET=
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
CLIENT_URL=
BREVO_API_KEY=
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
git clone https://github.com/your-username/SmartCafe.git
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
1. Firebase popup authentication
2. Backend verification
3. JWT token generated

---

# 🌍 Deployment

## Frontend
- Hosted on Vercel

## Backend
- Hosted on Render

## Database
- MongoDB Atlas

---

# 📱 Responsive Design

Fully responsive for:
- Mobile
- Tablet
- Desktop

---

# 🧠 What I Learned

- MERN Stack Development
- JWT Authentication
- OTP Verification Systems
- Google OAuth Integration
- Cloud Deployment
- Email API Integration
- Protected Routes
- Admin Dashboard Management
- Production Debugging

---

# 📌 Future Improvements

- Online Payments
- Order Tracking
- Real-time Notifications
- Dark Mode
- Product Reviews
- Pagination
- Performance Optimization

---

# 👨‍💻 Author

## Monil Babariya
- LinkedIn: (https://www.linkedin.com/in/monil-babariya-bb902b2a4/)

---

# ⭐ Support

If you like this project, give it a star on GitHub ⭐