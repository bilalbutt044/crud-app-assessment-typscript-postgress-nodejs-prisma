# 🧩 User Management Assessment

This is a full-stack user management application built for an assessment. It includes authentication, user CRUD operations, and pagination.

## 📁 Project Structure


---

## 🚀 Tech Stack

### Frontend
- React + Vite
- TypeScript
- TailwindCSS
- Axios
- React Hook Form + Zod

### Backend
- Node.js + Express
- TypeScript
- Prisma ORM
- PostgreSQL
- JWT for Authentication

---

## ⚙️ Setup Instructions

### 1. Clone the Repo

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Backend Setup

```
cd backend
npm install
# Add a `.env` file with DB and JWT_SECRET
npx prisma migrate dev
npm run dev
```

### 3. Frontend Setup

```
cd ../frontend
npm install
npm run dev
```

Make sure VITE_API_BASE_URL is set correctly in frontend/.env.

🔐 Authentication
JWT-based auth

Login and protected routes

Axios interceptors handle token

✏️ Features
✅ Login & Protected Dashboard

✅ View paginated list of users

✅ Edit users inline with form validation

✅ Delete users with confirmation

✅ Global API error handling


