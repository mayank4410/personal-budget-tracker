/* =======================================
   controllers/budgetController.js
   Handles CRUD for budgets
======================================= */
const Budget = require("../models/Budget");

/* ================================
   @desc    Get all budgets for user
   @route   GET /api/budgets
   @access  Private
================================ */
const getBudgets = async (req, res) => {
  try {
    const budgets = await Budget.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(budgets);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ================================
   @desc    Create new budget
   @route   POST /api/budgets
   @access  Private
================================ */
const createBudget = async (req, res) => {
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
};

/* ================================
   @desc    Update a budget
   @route   PUT /api/budgets/:id
   @access  Private
================================ */
const updateBudget = async (req, res) => {
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
};

/* ================================
   @desc    Delete a budget
   @route   DELETE /api/budgets/:id
   @access  Private
================================ */
const deleteBudget = async (req, res) => {
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
};

module.exports = {
  getBudgets,
  createBudget,
  updateBudget,
  deleteBudget,
};
