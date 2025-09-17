/* =======================================
   routes/transactionRoutes.js - Transaction Routes
======================================= */
const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction"); // Corrected path
const { protect } = require("../middleware/auth");

/* ================================
   @route   GET /api/transactions
   @desc    Get all user transactions
   @access  Private
================================ */
router.get("/", protect, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ================================
   @route   POST /api/transactions
   @desc    Add new transaction
   @access  Private
================================ */
router.post("/", protect, async (req, res) => {
  const { description, amount, type, category, date } = req.body;

  try {
    const transaction = new Transaction({
      user: req.user.id,
      description,
      amount,
      type,
      category,
      date,
    });

    const saved = await transaction.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

/* ================================
   @route   DELETE /api/transactions/:id
   @desc    Delete transaction
   @access  Private
================================ */
router.delete("/:id", protect, async (req, res) => {
  try {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
      return res.status(404).json({ message: "Transaction not found" });
    }

    if (transaction.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await transaction.deleteOne();
    res.json({ message: "Transaction removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
