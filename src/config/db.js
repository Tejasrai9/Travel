// Importing necessary modules
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Counter from '../models/counter.js'; 

// Initialize dotenv to use .env file variables
dotenv.config();

// Async function to connect to the database
const connectDB = async () => {
    try {
        // Attempt to connect to the MongoDB database
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Log success message
        console.log('MongoDB connected...');
        // Check if the counter document exists
    const counter = await Counter.findById('TRNumber');
    if (!counter) {
      // If not, create it with a starting sequence number of 1
      const newCounter = new Counter({ _id: 'TRNumber', seq: 1 });
      await newCounter.save();
      console.log('Initialized TRNumber counter with seq 1');
    }
    } catch (error) {
        // Log any errors
        console.error('Database connection error: ', error);
        // Exit the application with failure
        process.exit(1);
    }
};

// Exporting the connectDB function for use in other files
export default connectDB;
