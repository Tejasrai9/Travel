// src/models/userData.js
import mongoose from 'mongoose';

// Schema definition for user data
const userDataSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
  place: { type: String, required: true },
  designation: { type: String, required: true },
  approver: { type: String, required: true },
}, { timestamps: true });

// Model creation
const UserData = mongoose.model('UserData', userDataSchema);

export default UserData;
