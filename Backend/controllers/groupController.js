/* =======================================
   controllers/groupController.js
   Handles group creation & shared expenses
======================================= */
const Group = require("../models/Group");

/* ================================
   @desc    Create new group
   @route   POST /api/groups
   @access  Private
================================ */
const createGroup = async (req, res) => {
  const { name, members } = req.body; // members = array of userIds

  try {
    const group = new Group({
      name,
      members: members.map((id) => ({ user: id, balance: 0 })),
      createdBy: req.user.id,
    });

    const saved = await group.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Invalid data", error: err.message });
  }
};

/* ================================
   @desc    Get all groups for user
   @route   GET /api/groups
   @access  Private
================================ */
const getGroups = async (req, res) => {
  try {
    const groups = await Group.find({ "members.user": req.user.id }).populate("members.user", "name email");
    res.json(groups);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

/* ================================
   @desc    Add expense to group
   @route   POST /api/groups/:id/expenses
   @access  Private
================================ */
const addExpense = async (req, res) => {
  const { description, amount, paidBy, splitBetween } = req.body;

  try {
    const group = await Group.findById(req.params.id);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Create expense entry
    const expense = {
      description,
      amount,
      paidBy,
      splitBetween,
    };
    group.transactions.push(expense);

    // Split expense evenly
    const share = amount / splitBetween.length;

    // Update balances
    group.members.forEach((member) => {
      if (splitBetween.includes(member.user.toString())) {
        if (member.user.toString() === paidBy) {
          member.balance += amount - share; // they paid more than their share
        } else {
          member.balance -= share; // they owe
        }
      }
    });

    const saved = await group.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(400).json({ message: "Error adding expense", error: err.message });
  }
};

/* ================================
   @desc    Get single group with details
   @route   GET /api/groups/:id
   @access  Private
================================ */
const getGroup = async (req, res) => {
  try {
    const group = await Group.findById(req.params.id).populate("members.user", "name email");
    if (!group) return res.status(404).json({ message: "Group not found" });

    res.json(group);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

module.exports = {
  createGroup,
  getGroups,
  addExpense,
  getGroup,
};
