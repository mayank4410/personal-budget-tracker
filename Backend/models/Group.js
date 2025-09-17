/* =======================================
   models/Group.js
   Group Model - for shared expenses
======================================= */
const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    members: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        balance: { type: Number, default: 0 }, // Positive = others owe them, Negative = they owe
      },
    ],
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    transactions: [
      {
        description: String,
        amount: Number,
        paidBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        splitBetween: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
        date: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Group", groupSchema);
