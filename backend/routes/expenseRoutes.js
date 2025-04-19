const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense'); // Make sure you have a model for Expense

// POST: Add new expense
router.post('/', async (req, res) => {
  try {
    const { title, amount } = req.body;

    // Create a new expense
    const newExpense = new Expense({
      title,
      amount,
    });

    // Save the expense to the database
    await newExpense.save();

    res.status(201).json({
      message: 'Expense added successfully!',
      data: newExpense,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error adding expense', error });
  }
});

// GET: Fetch all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find();
    res.status(200).json({ expenses });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching expenses', error });
  }
});

// DELETE: Delete an expense by ID
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.findByIdAndDelete(id);
    res.status(200).json({ message: 'Expense deleted successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting expense', error });
  }
});

module.exports = router;
