# 📝 Blog Editor App

A full-stack blog editor where users can create, edit, auto-save drafts, and publish blogs. Built with React and Node.js, featuring JWT authentication and MongoDB storage.

Demo-Link: https://personalized-health-companion.vercel.app/

## 🚀 Features

* ✍️ Create, edit, and auto-save blog drafts
* ⏱ Auto-save after 5 seconds of inactivity using debounce
* 📦 Save as draft and publish functionality
* 🔐 JWT-based login and signup
* 📃 View all published and draft blogs separately
* ✅ Toast notification when draft is auto-saved
* 💾 MongoDB integration for persistent storage

## 🛠 Tech Stack

| Layer      | Tech                                     |
| ---------- | ---------------------------------------- |
| Frontend   | React.js, React Router, Toastify         |
| Backend    | Node.js, Express.js, JWT                 |
| Database   | MongoDB (via Mongoose)                   |

## 📁 Folder Structure

BlogEditor/\
├── backend/\
│   ├── ... config, controllers, middlewares, models, routes\
│   ├── main.js\
│   ├── .env\
│   ├── package.json\
├── frontend/\
│   ├── src/\
│   │   ├── components/\
│   │   │   ├── ... Authenticate.jsx, Editor.jsx, Navbar.jsx, Viewer.jsx\
│   │   ├── App.css\
│   │   ├── App.jsx\
│   │   ├── AppProvider.jsx\
│   │   ├── main.jsx\
│   ├── package.json

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/anmolkhurana490/Blog-Editor.git
cd BlogEditor
```

---

### 2. Backend Setup

- Create a .env file in the backend folder:

```
MONGODB\_URI=mongodb+srv://<username>:<password>@cluster.mongodb.net/Blog-Editor
JWT\_SECRET=your\_jwt\_secret\_here
```

- Navigate to the backend folder, Install dependencies and run the backend:

```bash
cd backend
npm install
node main.js
```

This starts your Express server on the specified port.

---

### 3. Frontend Setup

- Open a new terminal, navigate to the frontend, Install dependencies and Run the development server:

```bash
cd frontend
npm install
npm run dev
```

By default, this starts the React app at [http://localhost:5173](http://localhost:5173) or 3000 depending on your config.

---

## 🌐 Database Setup

* Create a new MongoDB database named Blog-Editor.
* Add a collection named blogs.
* Make sure your MongoDB connection string in .env is correct.

---

## ✅ API Endpoints

| Method | Endpoint              | Description                 |
| ------ | --------------------- | --------------------------- |
| POST   | /api/blogs/save-draft | Save or update a draft blog |
| POST   | /api/blogs/publish    | Publish a blog              |
| GET    | /api/blogs            | Retrieve all blogs          |
| GET    | /api/blogs/\:id       | Retrieve blog by ID         |