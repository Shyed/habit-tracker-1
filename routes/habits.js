// Import Express framework
const express = require('express');

// Create Express router: helps organize API endpoints into separate files
const router = express.Router();

// Import Habit databse model: lets us interact with MongoDB habits collection
const Habit = require('../models/Habit');

/* ==== GET ALL HABITS ==== */

// Get request: Fetches all habits from database
router.get('/', async (req, res) => {
  // Find all habits in MongoDB
  const habits = await Habit.find();
  // Send habits back as JSON response
  res.json(habits);
});

/* ==== CREATE NEW HABITS ==== */

// POST request: creates new habit
router.post('/', async (req, res) => {
  // Create new habit object
  const habit = new Habit({ name: req.body.name, completedDates: [] });
  // Save new habit into MongoDB
  await habit.save();
  // Send saved habit back to frontend
  res.json(habit);
});

/* ==== COMPLETE HABIT ==== */

// PUT request: marks habit as completed for today's date
router.put('/:id/complete', async (req, res) => {
  // Get today's date
  const date = new Date().toISOString().split('T')[0];
  // Find habit by MongoDB ID
  const habit = await Habit.findById(req.params.id);
  // Prevent duplicate completion dates
  if (!habit.completedDates.includes(date)) {
    // Add today's date into completeDates array
    habit.completedDates.push(date);
  }
  // Save updated habits
  await habit.save();
  // Send updated habit back to frontend
  res.json(habit);
});

// Export router so server.js can use it
module.exports = router;
