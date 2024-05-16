// src/models/counter.js
import mongoose from 'mongoose';

const counterSchema = new mongoose.Schema({
  _id: { type: String, required: true, default: 'TRNumber' },
  seq: { type: Number, default: 0 }
}, { timestamps: false });

const Counter = mongoose.model('Counter', counterSchema);

export default Counter;
