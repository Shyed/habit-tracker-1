const express = require('express');
const router = express.Router();
const Habit = require('../models/Habit');

router.get('/', async (req, res) => {
  const habits = await Habit.find();
  res.json(habits);
});

router.post('/', async (req, res) => {
  const habit = new Habit({ name: req.body.name, completedDates: [] });
  await habit.save();
  res.json(habit);
});

router.put('/:id/complete', async (req, res) => {
  const date = new Date().toISOString().split('T')[0];
  const habit = await Habit.findById(req.params.id);
  if (!habit.completedDates.includes(date)) {
    habit.completedDates.push(date);
  }
  await habit.save();
  res.json(habit);
});

module.exports = router;
