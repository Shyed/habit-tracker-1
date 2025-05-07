const mongoose = require('mongoose');

const habitSchema = new mongoose.Schema({
  name: String,
  completedDates: [String], // ISO date strings like "2025-05-06"
});

module.exports = mongoose.model('Habit', habitSchema);
