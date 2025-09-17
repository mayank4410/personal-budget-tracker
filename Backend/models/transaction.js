/* =======================================
   models/Transaction.js - Transaction Schema
======================================= */
const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true, // Every transaction belongs to a user
    },
    description: {
      type: String,
      required: [true, "Please add a description"],
      trim: true,
    },
    amount: {
      type: Number,
      required: [true, "Please add an amount"],
    },
    type: {
      type: String,
      enum: ["income", "expense"],
      required: [true, "Please specify type (income/expense)"],
    },
    category: {
      type: String,
      default: "General",
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Transaction", TransactionSchema);
