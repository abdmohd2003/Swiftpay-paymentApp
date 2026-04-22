# PayTM Full-Stack Clone

A modern, secure full-stack payment application built with the MERN stack. This project features secure user authentication, real-time balance updates, and atomic money transfers using MongoDB transactions.


## ✨ Features

- **Secure Authentication**: Password hashing with `bcryptjs` and JWT-based session management.
- **Atomic Transfers**: Ensures data integrity during money transfers using MongoDB sessions and transactions.
- **Real-time Search**: Debounced user search functionality for a smooth experience.
- **Modern UI/UX**: Premium design using Tailwind CSS with glassmorphism effects and smooth transitions.
- **Responsive Design**: Fully optimized for both mobile and desktop screens.
- **Robust Validation**: Input validation using Zod for both frontend and backend.

## 🚀 Tech Stack

- **Frontend**: React, Vite, Tailwind CSS, Axios, React Router
- **Backend**: Node.js, Express, MongoDB, Mongoose, JWT, Zod, bcryptjs
- **Database**: MongoDB (with Transaction support)

## 🛠️ Getting Started

### Prerequisites

- Node.js (v16 or higher)
- MongoDB Cluster (Atlas or local with Replica Set for transactions)

### 1. Clone the repository
```bash
git clone <repository-url>
cd paytm
```

### 2. Backend Setup
```bash
cd backend
npm install
```
Create a `.env` file in the `backend` directory:
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```
Start the backend server:
```bash
npm start
```

### 3. Frontend Setup
```bash
cd ../frontend
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

## 🐞 Bug Fixes Implemented

- **Security**: Added password hashing (passwords were previously stored in plain text).
- **Data Integrity**: Implemented MongoDB transactions in the `/transfer` route to prevent money loss during failures.
- **Bugs**: Fixed the user update logic and a critical typo (`fistName` -> `firstName`) in the frontend.
- **Performance**: Added debouncing to the user search to minimize unnecessary API calls.
- **Logic**: Implemented full sign-in logic which was previously missing.

---
