# Scalable Full-Stack Web Application

## Overview

This project is a scalable and secure full-stack web application built with:

Frontend:

- React (Vite)
- TailwindCSS
- React Router
- React Hook Form + Zod

Backend:

- Node.js
- Express.js
- MongoDB
- JWT Authentication
- bcrypt Password Hashing

The application includes secure authentication, protected routes, and full CRUD functionality with user-based data isolation.

---

## Features

- JWT-based authentication
- Password hashing using bcrypt
- Protected API routes with middleware
- Axios interceptor for automatic token handling
- Full CRUD operations
- Search & filter functionality
- Clean scalable architecture
- Centralized error handling
- Responsive UI

---

## Project Structure

Root
├── backend
├── frontend
├── README.md
├── SCALING.md
└── postman_collection.json

---

## Setup Instructions

### 1. Clone Repository

git clone <your-repo-link>

---

### 2. Backend Setup

cd backend
npm install

Create .env file:

PORT=5000
MONGO_URI=your_mongodb_connection
JWT_SECRET=your_super_secret

Run server:

npm run dev

---

### 3. Frontend Setup

cd frontend
npm install
npm run dev

Frontend runs on:
http://localhost:5173

Backend runs on:
http://localhost:5000

---

## Security Implementation

- Password hashing with bcrypt (12 salt rounds)
- JWT token expiration
- Protected routes with middleware
- User-based task isolation
- Helmet security headers
- Centralized error handling
- Axios 401 interceptor auto-logout

---

## Author

Mohd Tauseef Ansari
MERN Stack Developer
