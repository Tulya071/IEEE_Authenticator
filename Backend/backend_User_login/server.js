require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Add CORS middleware
const nodemailer = require('nodemailer');
const authController = require('./authController');

const app = express();
const PORT = process.env.PORT || 5203;

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

// Define a user schema
const userSchema = new mongoose.Schema({
  email: String,
  code: String
});

const User = require('./userModel'); // Adjust the path based on your project structure

// Endpoint for user authentication
app.post('/api/authenticate', authController.authenticateUser);

//new
app.post('/send-email', (req, res) => {
  const { email, code } = req.body;

  // Create a nodemailer transporter
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'nayaktulya@gmail.com', // Your Gmail email address
      pass: '#Tulyanayak@071' // Your Gmail password or app-specific password
    }
  });

  // Email message
  const mailOptions = {
    from: 'nayaktulya@gmail.com', // Sender address
    to: email, // List of recipients
    subject: 'Verification Code', // Subject line
    text: `Your verification code is: ${code}` // Plain text body
  };

  // Send email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ success: false, message: 'Failed to send email' });
    } else {
      console.log('Email sent:', info.response);
      res.json({ success: true, message: 'Email sent successfully' });
    }
  });
});
//new

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
