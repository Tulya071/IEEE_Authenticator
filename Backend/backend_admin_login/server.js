// backend_admin_login/server.js

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); 
const bodyParser = require('body-parser');
const authController = require('./authController');
const app = express();
const PORT = process.env.PORT || 5205; // Choose a different port

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose
  .connect('mongodb://localhost:27017/IEEE')
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

// Define a user schema (adjust as needed)
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});

const User = require('./userModel'); 


app.post('/api/authenticate', authController.authenticateUser);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
