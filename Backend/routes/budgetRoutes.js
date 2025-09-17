/* =======================================
   routes/budgets.js - Budget Routes
======================================= */
const express = require("express");
const router = express.Router();
const Budget = require("../models/Budget");
const { protect } = require("../middleware/auth");

/* ================================
   @route   GET /api/budgets
   @desc    Get all budgets for user
   @access  Private
================================ */
router.get("/", protect, async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ================================
   @route   POST /api/budgets
   @desc    Create new budget
   @access  Private
================================ */
router.post("/", protect, async (req, res) => {
  const { category, limit, startDate, endDate } = req.body;

  try {
    const budget = new Budget({
      user: req.user.id,
      category,
      limit,
      startDate,
      endDate,
    });

    const saved = await budget.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
});

/* ================================
   @route   PUT /api/budgets/:id
   @desc    Update a budget
   @access  Private
================================ */
router.put("/:id", protect, async (req, res) => {
  try {
    let budget = await Budget.findById(req.params.id);

    if (!budget) return res.status(404).json({ message: "Budget not found" });
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    budget = await Budget.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(budget);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

/* ================================
   @route   DELETE /api/budgets/:id
   @desc    Delete a budget
   @access  Private
================================ */
router.delete("/:id", protect, async (req, res) => {
  try {
    const budget = await Budget.findById(req.params.id);

    if (!budget) return res.status(404).json({ message: "Budget not found" });
    if (budget.user.toString() !== req.user.id) {
      return res.status(401).json({ message: "Not authorized" });
    }

    await budget.deleteOne();
    res.json({ message: "Budget removed" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = router;
