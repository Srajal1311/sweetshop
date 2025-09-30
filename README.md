# 🍬 Sweetshop Management Application

A full-stack **Sweetshop Management App** built with **React (frontend)**, **Node.js + Express (backend)**, and **MongoDB with Mongoose (database)**.  
This project demonstrates **end-to-end web development**, including API design, frontend integration, and database operations.

---

## 🚀 Features

### Frontend (React)
- Built with React (`.js`/`.jsx` files).
- Display a list of sweets with details (name, category, price, quantity).
- Add a new sweet using a form.
- Update or delete an existing sweet.
- Search sweets by:
  - **Name** (e.g., `Ladoo`)
  - **Category** (e.g., `Indian`)
  - **Price range** (`minPrice`, `maxPrice`).

### Backend (Node.js + Express)
- RESTful API routes for CRUD operations.
- Handles query parameters for flexible search

🛠️ Tech Stack

Frontend: React (JSX, Hooks)

Backend: Node.js, Express

Database: MongoDB, Mongoose

Tools: Git, npm, .gitignore, environment variables

Deployment: (can be hosted on Render/Netlify if required)

⚙️ Installation & Setup

Clone the repository:

git clone https://github.com/<your-username>/<your-repo>.git
cd sweetshop


Install dependencies for backend:

cd backend
npm install


Install dependencies for frontend:

cd ../frontend
npm install


Run backend:

npm start


Run frontend:

npm start


By default:

Frontend runs on http://localhost:3000

Backend runs on http://localhost:5000

📡 API Endpoints
Sweets

GET /api/sweets → Get all sweets.

GET /api/sweets?name=Ladoo → Search by name.

GET /api/sweets?category=Indian&minPrice=10&maxPrice=100 → Filter by category and price.

POST /api/sweets → Add a new sweet.

PUT /api/sweets/:id → Update a sweet.

DELETE /api/sweets/:id → Delete a sweet.

📂 Project Structure
sweetshop/
│── backend/
│   ├── models/
│   ├── routes/
│   ├── controllers/
│   └── server.js
│
│── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── App.js
│
│── .gitignore
│── README.md
│── package.json
│── docker-compose.yml (optional)

📸 Screenshots
<img width="1267" height="609" alt="Screenshot 2025-09-30 064540" src="https://github.com/user-attachments/assets/8e3ec907-e35e-4396-b022-0eec4a4b54fa" />
<img width="1274" height="665" alt="Screenshot 2025-09-30 064554" src="https://github.com/user-attachments/assets/1b8601f9-1cbf-49eb-a03b-768ff235aa46" />
<img width="1269" height="659" alt="Screenshot 2025-09-30 064632" src="https://github.com/user-attachments/assets/d49d87b3-5e55-4d5b-b645-c473baf6ac49" />
<img width="1352" height="673" alt="Screenshot 2025-09-27 060446" src="https://github.com/user-attachments/assets/2256b646-180a-4610-bd36-18325775f90b" />
<img width="1334" height="633" alt="Screenshot 2025-09-27 070204" src="https://github.com/user-attachments/assets/909097a3-919e-4e33-952e-d5b4d6d90989" />
<img width="1329" height="633" alt="Screenshot 2025-09-27 070251" src="https://github.com/user-attachments/assets/24d51968-517b-475d-bf44-f7c3e02fc475" />
👨‍💻 Author

Srajal Meshram

🤖 AI Assistance

Parts of this project were refined with the help of AI, specifically in:

Debugging Mongoose query filters for category and price search.

Creating a clean .gitignore configuration.

Drafting and polishing the README.md structure.



