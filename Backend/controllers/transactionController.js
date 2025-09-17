/* =======================================
   controllers/transactionController.js
   Handles CRUD for transactions
======================================= */
const Transaction = require("/models/Transaction");

/* ================================
   @desc    Get all transactions for user
   @route   GET /api/transactions
   @access  Private
================================ */
const getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ================================
   @desc    Add new transaction
   @route   POST /api/transactions
   @access  Private
================================ */
const addTransaction = async (req, res) => {
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
};

/* ================================
   @desc    Delete transaction
   @route   DELETE /api/transactions/:id
   @access  Private
================================ */
const deleteTransaction = async (req, res) => {
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
};

module.exports = {
  getTransactions,
  addTransaction,
  deleteTransaction,
};
