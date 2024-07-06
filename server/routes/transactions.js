const express = require("express");
const userModel = require("../models/UserModel");
const transactionModel = require("../models/TransactionModel");
const router = express.Router();

router.post("/transactions", async (req, res) => {
  try {
    const { userId, ...transactionData } = req.body;
    const newTransaction = new transactionModel({
      ...transactionData,
      user: userId,
      date: getFromSlot(),
    });
    await newTransaction.save();

    // Add the transaction to the user's transactions array
    const user = await userModel.findById(userId);
    user.transactions.push(newTransaction._id);
    await user.save();

    res.status(201).json({ success: true, transaction: newTransaction });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

router.get("/transactions/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await userModel.findById(userId).populate("transactions");
    res.status(200).json({ success: true, transactions: user.transactions });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;
