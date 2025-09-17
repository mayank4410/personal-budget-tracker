/* =======================================
   routes/groups.js
   Routes for group expense sharing
======================================= */
const express = require("express");
const router = express.Router();

const { createGroup, getGroups, addExpense, getGroup } = require("../controllers/groupController");
const { protect } = require("../middleware/auth");

/* ================================
   @route   POST /api/groups
   @desc    Create a new group
   @access  Private
================================ */
router.post("/", protect, createGroup);

/* ================================
   @route   GET /api/groups
   @desc    Get all groups for logged-in user
   @access  Private
================================ */
router.get("/", protect, getGroups);

/* ================================
   @route   GET /api/groups/:id
   @desc    Get single group details
   @access  Private
================================ */
router.get("/:id", protect, getGroup);

/* ================================
   @route   POST /api/groups/:id/expenses
   @desc    Add expense to group
   @access  Private
================================ */
router.post("/:id/expenses", protect, addExpense);

module.exports = router;
