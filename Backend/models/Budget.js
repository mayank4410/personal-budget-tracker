/* =======================================
   models/Budget.js - Budget Schema
======================================= */
const mongoose = require("mongoose");

const BudgetSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Each budget belongs to a user
    },
    category: {
      type: String,
      required: [true, "Please add a category"],
      trim: true,
    },
    limit: {
      type: Number,
      required: [true, "Please add a budget limit"],
    },
    spent: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Budget", BudgetSchema);
