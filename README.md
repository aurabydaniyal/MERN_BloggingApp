# ✨ BlogSphere - MERN Stack Blogging Platform

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18.x-green.svg)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-6.x-brightgreen.svg)](https://www.mongodb.com/)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.com/)

A modern, full-stack blogging platform built with the MERN stack featuring stunning glassmorphism UI with a golden theme, complete JWT authentication, and real-time blog management.

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Installation](#-installation)
- [Environment Variables](#-environment-variables)
- [Running the Application](#-running-the-application)
- [API Documentation](#-api-documentation)
- [Database Schema](#-database-schema)
- [Security Features](#-security-features)
- [Theme System](#-theme-system)
- [Contributing](#-contributing)
- [License](#-license)
- [Contact](#-contact)

---

## ✨ Features

**🔐 Authentication:** User registration with email validation, secure login with JWT tokens, HTTP-only cookies for security, protected routes and API endpoints, theme preference persistence

**📝 Blog Management:** Create, edit, and delete blogs, cover photo upload support, personal blog dashboard, date stamp tracking

**💬 Social Features:** Like/Unlike blog posts, Comment/Review system, User profiles with blog history

**🎨 UI/UX:** Glassmorphism design system, Dark/Light/Golden theme switcher, Fully responsive (mobile-first), Smooth animations and transitions, Marquee announcement bar, Toast notifications

**🛡️ Security:** Input validation and sanitization, Rate limiting (100 requests/15 minutes), Password hashing (bcrypt), HTTP-only secure cookies, Helmet.js security headers, CORS configuration

---

## 🛠️ Tech Stack

**Frontend:** React 18, React Router v6, Tailwind CSS 3, Axios, React Hot Toast, Heroicons

**Backend:** Node.js 18, Express.js 4, MongoDB 6, Mongoose 7, JWT, Bcryptjs, Cookie Parser

---

## 📁 Project Structure

mern-blogging-app/
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── models/
│   │   │   ├── User.js
│   │   │   └── Blog.js
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   └── blogController.js
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   └── blogRoutes.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   └── validation.js
│   │   └── server.js
│   ├── package.json
│   └── .env
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── auth/
    │   │   │   ├── Login.jsx
    │   │   │   └── Signup.jsx
    │   │   ├── blogs/
    │   │   │   ├── BlogCard.jsx
    │   │   │   ├── BlogForm.jsx
    │   │   │   └── BlogList.jsx
    │   │   ├── common/
    │   │   │   └── Navbar.jsx
    │   │   └── home/
    │   │       └── Home.jsx
    │   ├── context/
    │   │   └── AuthContext.jsx
    │   ├── styles/
    │   │   └── globals.css
    │   ├── App.jsx
    │   └── index.js
    ├── package.json
    └── tailwind.config.js

---

## 💻 Installation

**Prerequisites:** Node.js (v14 or higher), npm or yarn, MongoDB (local or Atlas)

**Clone and Setup:**

git clone https://github.com/YOUR_USERNAME/mern-blogging-app.git
cd mern-blogging-app

cd backend
npm install
npm run dev

cd frontend
npm install
npm start

**Environment Variables (.env):**

Create .env file in backend folder:
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/blogDB
JWT_SECRET=your_super_secret_key_here
JWT_EXPIRE=7d

---

## 🚀 Running the Application

**Start MongoDB:**
mongod --dbpath C:\data\db

**Start Backend:**
cd backend
npm run dev
Server runs on http://localhost:5000

**Start Frontend:**
cd frontend
npm start
App runs on http://localhost:3000

---

## 📚 API Documentation

**Authentication Endpoints:**
POST /api/auth/register - Register new user (Public)
POST /api/auth/login - Login user (Public)
GET /api/auth/me - Get current user (Private)
GET /api/auth/logout - Logout user (Private)
PUT /api/auth/theme - Update theme (Private)

**Blog Endpoints:**
GET /api/blogs - Get all blogs (Public)
GET /api/blogs/:id - Get single blog (Public)
POST /api/blogs - Create blog (Private)
PUT /api/blogs/:id - Update blog (Private)
DELETE /api/blogs/:id - Delete blog (Private)
GET /api/blogs/me - Get user's blogs (Private)
POST /api/blogs/:id/reviews - Add review (Private)
POST /api/blogs/:id/like - Like/Unlike (Private)

**Example API Requests:**

Register:
curl -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"username":"john","email":"john@test.com","password":"password123"}'

Login:
curl -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"john@test.com","password":"password123"}'

Create Blog:
curl -X POST http://localhost:5000/api/blogs -H "Content-Type: application/json" -d '{"title":"My Blog","description":"A great blog","storyline":"Content here"}'

Get All Blogs:
curl http://localhost:5000/api/blogs

---

## 📊 Database Schema

**User Schema:**
username: String (required, unique, min: 3)
email: String (required, unique, lowercase)
password: String (required, min: 6, hashed)
theme: String (enum: ['light', 'dark', 'golden'])
createdAt: Date

**Blog Schema:**
title: String (required, max: 100)
description: String (required, max: 200)
storyline: String (required)
coverPhoto: String
author: ObjectId (ref: 'User')
authorName: String
dateStamp: Date
reviews: [{ user: ObjectId (ref: 'User'), userName: String, comment: String, createdAt: Date }]
likes: [ObjectId (ref: 'User')]

---

## 🔒 Security Features

Password hashing with bcrypt (salt rounds: 10)
JWT authentication with HTTP-only cookies
Rate limiting (100 requests per 15 minutes)
CORS configuration for specific origins
Helmet.js security headers
Server-side input validation
XSS and CSRF protection

---

## 🎨 Theme System

Dark - Default dark theme with modern look
Light - Clean white interface
Golden - Premium gold-tone theme

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (git checkout -b feature/AmazingFeature)
3. Commit changes (git commit -m 'Add AmazingFeature')
4. Push to branch (git push origin feature/AmazingFeature)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👏 Acknowledgments

Tailwind CSS, Heroicons, React Hot Toast, Mongoose

---

## 📞 Contact

Author: Your Name
GitHub: YourUsername
Email: your.email@example.com

---

## ⭐ Support

If you find this project useful, please give it a star ⭐ on GitHub!

---

Built with ❤️ using the MERN Stack
