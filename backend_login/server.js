require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add CORS middleware
const authController = require('./authController');

const app = express();
const PORT = process.env.PORT || 5050;

app.use(bodyParser.json());
app.use(cors()); // Enable CORS for all routes

// Connect to MongoDB
mongoose
  .connect('mongodb+srv://ayush:apmosys%40123@userdetails.fksmxge.mongodb.net/', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('MongoDB connected');
  })
  .catch((error) => {
    console.error('MongoDB connection failed:', error);
  });

// Define a user schema
const userSchema = new mongoose.Schema({
  email: String,
  code: String
});

const User = require('./userModel'); // Adjust the path based on your project structure

// Endpoint for user authentication
app.post('/api/authenticate', authController.authenticateUser);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
