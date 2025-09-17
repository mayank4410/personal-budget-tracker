README.md
# Personal Budget Tracker

A simple **Personal Budget Tracker** web application built using **Node.js**, **Express**, **MongoDB**, and **Vanilla JavaScript**.  
This project allows users to manage their income, expenses, and group budgets efficiently.

---

## **Features**

- Add, update, and delete transactions (income/expense)
- Track monthly budgets and expenses
- Group transactions for shared budgets
- User-friendly frontend interface
- Backend REST API using Express & MongoDB
- Secure environment configuration using `.env`

---

## **Project Structure**



personal-budget-tracker/
│
├─ backend/
│ ├─ config/ # DB configuration
│ ├─ controllers/ # Logic for handling routes
│ ├─ middleware/ # Authentication or error handling
│ ├─ models/ # Mongoose schemas
│ ├─ routes/ # API routes
│ ├─ db.js # MongoDB connection setup
│ └─ server.js # Express server setup
│
├─ frontend/
│ ├─ assets/ # Images, icons, fonts
│ ├─ css/ # Stylesheets
│ ├─ js/ # Frontend scripts
│ ├─ add-transaction.html
│ ├─ budget.html
│ ├─ group.html
│ └─ index.html
│
├─ .env # Environment variables
├─ package.json # Project dependencies
└─ README.md # Project documentation


---

## **Installation & Setup**

1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/personal-budget-tracker.git
   cd personal-budget-tracker


Install dependencies:

npm install


Set up .env file:

PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/budgetTrackerDB
JWT_SECRET=your_jwt_secret_key


Run the server (development mode):

npm run dev


Open frontend pages in browser (e.g., index.html)

Dependencies

Node.js

Express

MongoDB

Mongoose

dotenv

cors

nodemon
 (dev dependency)

Future Enhancements

User authentication & login system

Dashboard with charts & analytics

Responsive design for mobile devices

Cloud deployment using MongoDB Atlas and Heroku/Vercel

Author

Mayank Singh

License

This project is licensed under the MIT License.


---

Agar chaho toh mai ab **`db.js` aur `server.js`** ka full ready-to-run code bhi tumhare liye bana doon, jisse turant project chal jaye.  

Kya mai wo bana doon?
