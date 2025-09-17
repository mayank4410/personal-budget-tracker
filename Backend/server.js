/* ================================
   server.js - Backend Entry Point
   ================================ */

const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config(); // Load .env variables

const app = express();
const PORT = process.env.PORT || 5000;

/* ================================
   Middleware
================================ */
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests

/* ================================
   MongoDB Connection
================================ */
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

/* ================================
   Routes
================================ */
app.get("/", (req, res) => {
  res.send("Budget Tracker API is running 🚀");
});

// Import route modules
const transactionRoutes = require("./routes/transactionRoutes");
const budgetRoutes = require("./routes/budgetRoutes");
const groupRoutes = require("./routes/groups"); // ✅ correct filename
const authRoutes = require("./routes/authRoutes");

// Use routes
app.use("/api/transactions", transactionRoutes);
app.use("/api/budgets", budgetRoutes);
app.use("/api/groups", groupRoutes);
app.use("/api/auth", authRoutes);

/* ================================
   Start Server
================================ */
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
