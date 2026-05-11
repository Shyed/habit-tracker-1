
// Loads environment varibales from .env file: safely store sensitive data like MongoDB URI
require('dotenv').config();

// Import express framework: helps create backend servers and APIs
const express = require('express');

// Import Mongoose: helps Node.js communicate with mongoDB
const mongoose = require('mongoose');

// Import CORS middleware: allows front and backend communication across diff ports/domains
const cors = require('cors');

// Import path utility: helps create safe file paths
const path = require('path');

// Create express application
const app = express();

// Use environment PORT if available, otherwise default to port 5000
const PORT = process.env.PORT || 5000;

/* ==== Middleware ===== */
// Enables CORS: allows frontend request to access backend API
app.use(cors());

// Allows server to read JSON data from request
app.use(express.json());

// Serves static fronend files from "public" folder
app.use(express.static(path.join(__dirname, 'public')));

/* ==== Routes ==== */
// Import habit routes file: handles API endpoints related to habits 
const habitRoutes = require('./routes/habits');

// All habit routes start with: /api/habits
app.use('/api/habits', habitRoutes);

/* ==== MongoDB Connection ==== */
// Connect to MongoDB database
mongoose.connect(process.env.MONGO_URI, {
  // Uses new user MongoDB URL parser
  useNewUrlParser: true,

  // Uses newer MongoDB connection engine
  useUnifiedTopology: true,

  // If databse connection succeeds
}).then(() => {
  // Start Express server
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  // If connection fails -> error
}).catch((err) => console.log(err));
