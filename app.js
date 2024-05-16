// Importing modules
import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import session from 'express-session';
import connectDB from './src/config/db.js';
import authRoutes from './src/routes/authRoutes.js';
import connectMongoDBSession from 'connect-mongodb-session';
// import jwt from 'jsonwebtoken';
import { generatePDF } from './src/utils/pdfGenerator.js';
import {sendEmail} from './src/utils/mailer.js';
import Counter from './src/models/counter.js';
import adminRoutes from './src/routes/adminRoutes.js';
import UserData from './src/models/userData.js';

import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';



dotenv.config();
connectDB();

const MongoDBStore = connectMongoDBSession(session);
const app = express();
const PORT = process.env.PORT || 3000;

const router = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(__dirname, 'uploads');
fs.existsSync(uploadsDir) || fs.mkdirSync(uploadsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
      cb(null, uploadsDir);
  },
  filename: function(req, file, cb) {
      cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });


app.use(session({
  secret: 'there is no secret key', // Replace 'your_secret_key' with a real secret key
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false, maxAge: 3600000 } // secure: true in production with HTTPS
}));


app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
// app.use('/api/users', usersRoute)

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.use(session({
  secret: 'your secret key',
  resave: false,
  saveUninitialized: true,
  store: store
}));

app.get('/', (req, res) => {
  res.render('index.ejs');
});





app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});


app.get('/api/auth/signup', (req, res) => {
  res.render('SignUp.ejs');
});

app.get('/api/auth/OtpVerification.ejs',(req,res) =>{

})

app.get('/otp-verification', (req, res) => {
  const userEmail = req.session.userEmail;
  res.render('OtpVerification', { email: userEmail, message: '' });
  console.log(req.body.email)
});



app.get('/dashboard', async (req, res) => {
  const userEmail = req.session.userEmail; // Retrieving the user's email from the session
  if (!userEmail) {
    return res.status(401).send('Unauthorized. Please login to access this page.');
  }
  try {
    const userData = await UserData.findOne({ email: userEmail });
    if (!userData) {
      return res.status(404).render('dashboard', { email: userEmail, userData: null, message: 'User data not found.' });
    }
    res.render('dashboard', { email: userEmail, userData: userData });
  } catch (error) {
    console.error('Error accessing dashboard:', error);
    res.status(500).send('Internal Server Error');
  }
});


// Assuming express setup and middleware are already defined above
app.post('/api/auth/submit-form', upload.single('documents'), async (req, res) => {
  try {
      const formData = req.body; // Form data excluding the file
      console.log(formData);

      // Increment the TRNumber counter and retrieve the updated value
      const updatedCounter = await Counter.findOneAndUpdate(
          { _id: "TRNumber" }, // Assuming you have a counter document with _id as "TRNumber"
          { $inc: { seq: 1 } }, // Increment the seq field
          { new: true, upsert: true } // Options to return the updated document and upsert if it doesn't exist
      );

      const trNumber = updatedCounter.seq; // The updated TR number
      console.log(`TRNumber updated to: ${trNumber}`);

      // Assuming the user's email is stored in session and approver's email is determined from formData
      const userEmail = req.session.userEmail; // Example; adjust based on your actual session handling
      const approverEmails = {
          "Tejas Rai": "tejasrai191@gmail.com",
          "Aashutosh": "tejas.rai@adventz.com",
          "Gurudeep": "ankitarai7838@gmail.com",
      };
      const approverEmail = approverEmails[formData["Approver Name"]];

      // Generate the PDF and get its path
      const pdfPath = await new Promise((resolve, reject) => {
          generatePDF(formData, userEmail, trNumber, (pdfPath) => {
              resolve(pdfPath);
          });
      });

      // Define attachments array including the generated PDF
      const attachments = [{
          filename: `TRNumber-${trNumber}-submission.pdf`,
          path: pdfPath
      }];

      // If a file was uploaded, add it to the attachments array
      if (req.file) {
          attachments.push({
              filename: req.file.originalname,
              path: req.file.path
          });
      }

      // Send email with attachments
      const emailSent = await sendEmail(approverEmail, "Form Submission with Documents", "Please find the attached documents.", attachments);

      if (emailSent) {
          console.log('Email with attachments sent successfully');
          return res.redirect(`/dashboard?message=${encodeURIComponent(`Form submitted and email sent to the approver, Your TR number is ${trNumber}`)}`);
      } else {
          console.log('Failed to send email with attachments');
          res.status(500).send('Failed to send email with attachments.');
      }
  } catch (error) {
      console.error('Error in form submission with file attachment:', error);
      res.status(500).send('An error occurred.');
  }
});


app.post('/api/auth/upload-file', upload.single('documents'), (req, res) => {
  if (!req.file) {
      return res.status(400).send({ message: 'Please upload a file.' });
  }

  // Here, you can also save file information to your database if needed
  console.log(req.file); // Contains file details

  // Respond with file information or any other data you need
  res.status(200).send({
      message: 'File uploaded successfully',
      fileName: req.file.filename,
      filePath: req.file.path
  });
});

app.get('/admin-panel', (req, res) => {
  res.render('adminPanel');
});




