// src/routes/adminRoutes.js
import express from 'express';
import UserData from '../models/userData.js';

const router = express.Router();

// Route to handle UserData upload
router.post('/upload-data', async (req, res) => {
  try {
    const { email, name, mobileNumber, place, designation, approver } = req.body;
    // Check if user data already exists for the given email
    const existingUser = await UserData.findOne({ email: email });
    if (existingUser) {
      return res.status(400).send('User data for this email already exists.');
    }
    // Create a new user data document
    const userData = new UserData({ email, name, mobileNumber, place, designation, approver });
    await userData.save(); // Save the document to the database
    res.status(201).send('User data uploaded successfully.');
  } catch (error) {
    console.error('Error uploading user data:', error);
    res.status(500).send('Internal server error while uploading user data.');
  }
});

export default router;
