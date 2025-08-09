# MERN Places App

A full-stack **MERN** (MongoDB, Express, React, Node.js) application for creating, storing, and displaying places with images, descriptions, and geolocation coordinates.  
Users can register, log in, and create their own places, which are associated with their accounts.


## 📂 Project Structure

/backend        # Node.js + Express + MongoDB API
/frontend       # React.js client application

## 🚀 Features

- **User Authentication** (Signup & Login)
- **CRUD Operations** for Places (Create, Read, Update, Delete)
- **MongoDB Models** for Users & Places
- **Image Upload Support**
- **Responsive UI** built with React
- **REST API** using Express and Mongoose

## 🛠 Tech Stack

**Frontend**
- React.js
- React Router
- Axios
- CSS Modules / Tailwind (based on your setup)

**Backend**
- Node.js
- Express.js
- MongoDB + Mongoose
- mongoose-unique-validator
- dotenv
- body-parser / express.json()

## ⚙ Backend Setup

### 1️⃣ Install Dependencies
```bash
cd backend
npm install
````

**Key Dependencies:**

* `express` – Web framework
* `mongoose` – MongoDB object modeling
* `mongoose-unique-validator` – Enforce unique fields
* `dotenv` – Environment variables
* `cors` – Cross-Origin Resource Sharing
* `body-parser` – Request body parsing (optional with latest Express)


### 2️⃣ Configure Environment Variables

Create a `.env` file inside `backend/`:

PORT=5000
MONGO_URI=you_mongodb_uri
JWT_SECRET=your_jwt_secret

### 3️⃣ Run Backend Server

```bash
npm start
```
Server runs on: **[http://localhost:5000](http://localhost:5000)**


## 💻 Frontend Setup

### 1️⃣ Install Dependencies

```bash
cd frontend
npm install
```

**Key Dependencies:**

* `react-router-dom` – Routing
* `axios` – HTTP requests
* `react-hook-form` or `formik` – Form handling (if used)
* `dotenv` – Environment variables

### 2️⃣ Configure API Base URL

In `frontend/.env`:

REACT_APP_API_URL=http://localhost:5000/api

### 3️⃣ Run Frontend

```bash
npm start
```

Frontend runs on: **[http://localhost:3000](http://localhost:3000)**

## 🗄 MongoDB Models

### **Place Model** (`places.js`)

```javascript
const placeSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  location: {
    lat: { type: Number, required: true },
    lng: { type: Number, required: true }
  },
  creator: { type: mongoose.Types.ObjectId, required: true, ref: 'User' }
});
```

### **User Model** (`user.js`)

```javascript
const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 5 },
  image: { type: String, required: true },
  places: [{ type: mongoose.Types.ObjectId, required: true, ref: 'Place' }]
});
```

## 🔗 API Endpoints
___________________________________________________________________
| Method | Endpoint            | Description       | Auth Required |
| ------ | ------------------- | ----------------- | ------------- |
| POST   | `/api/users/signup` | Register new user | No            |
| POST   | `/api/users/login`  | Login user        | No            |
| GET    | `/api/places`       | Get all places    | No            |
| GET    | `/api/places/:id`   | Get place by ID   | No            |
| POST   | `/api/places`       | Create new place  | Yes           |
| PATCH  | `/api/places/:id`   | Update place      | Yes           |
| DELETE | `/api/places/:id`   | Delete place      | Yes           |
____________________________________________________________________

## 📦 Deployment

1. Build the frontend:

```bash
cd frontend
npm run build
```

2. Serve the build folder with Express or deploy to a service like **Vercel**, **Netlify**, or **Heroku**.

## 📜 License

This project is licensed under the MIT License.

