# 🏥 Hospital Appointment System

A full-stack web application that allows users to book and manage hospital appointments. Built using **React**, **TailwindCSS**, **Node.js**, **Express.js**, and **MySQL**.

---

## 🚀 Live Demo

👉 [Hosted Link Here](#) <!-- Replace this with your Netlify/Render/other hosted link -->

---

## 📌 Features

### 👨‍⚕️ User Features:
- View list of available doctors and departments
- Book an appointment with available time slots
- View and manage your booked appointments

### 🛠️ Admin Features:
- Login to admin dashboard
- Add/edit/delete doctor profiles and departments
- View all booked appointments

---

## 🛠 Tech Stack

| Tech         | Description                    |
|--------------|--------------------------------|
| **Frontend** | React, TailwindCSS             |
| **Backend**  | Node.js, Express.js            |
| **Database** | MySQL                          |

---

## 📁 Folder Structure

├── client/ # React Frontend
│     ├── src/
│     ├── public/
│     └── ...
├── server/ # Node + Express Backend
│     ├── controllers/
│     ├── routes/
│     ├── db.js # MySQL connection
│     └── ...
├── package.json
└── README.md



---

## 🧑‍💻 Getting Started

### Prerequisites

- Node.js
- MySQL
- npm

### Installation

1. **Clone the repo**
```bash
git clone https://github.com/Tejas9420190282/Hosted-Hospital-Appointment-System-MYSQL
cd Hosted-Hospital-Appointment-System-MYSQL

2. **Set up MySQL Database**

  - Create a database in MySQL

  - Import tables from hospital.sql (if available)

  - Update database config in server/db.js

3. **Install dependencies**

  # For frontend
cd client
npm install

# For backend
cd ../server
npm install


# Start backend
cd server
npm start

# Start frontend
cd ../client
npm run dev

