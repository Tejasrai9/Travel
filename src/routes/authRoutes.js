import express from 'express';
import User from '../models/user.js';
import { generateOTP } from '../utils/otpGenerator.js';
import { sendEmail } from '../utils/mailer.js';
import bcrypt from 'bcrypt';
// Import any additional libraries or modules needed

const router = express.Router();

// Route for handling new registrations
router.post('/register', async (req, res) => {
    const { email, password, confirmPassword } = req.body;

    // Email domain restriction check
    if (!email.endsWith("@adventz.com")) {
        return res.redirect(`/api/auth/signup?message=${encodeURIComponent("Registration only allowed for Adventz group of companies.")}`);
        // return res.status(400);
    }

    // Basic validation
    if (password !== confirmPassword) {
        // return res.status(400).send('Passwords do not match.');
        return res.redirect(`/api/auth/signup?message=${encodeURIComponent("Password did not match.")}`);
    }
    
    try {
        // Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).send('User already exists.');
        }
        
        // Create a new user instance
        user = new User({
            email,
            password, // Password will be hashed by the pre-save middleware
        });

        // Generate OTP and set expiration
        const otp = generateOTP();
        user.otp = otp;
        user.otpExpires = new Date(Date.now() + 60000); // OTP expires in 1 minute

        // Save the new user with OTP and expiration
        await user.save();

        // Send the OTP to the user's email
        await sendEmail(user.email, 'Greetings from Adventz, Please Verify Your Email', `Your OTP is: ${otp}`);
        
        // res.status(201   ).send('User registered. Please check your email for verification.');
        req.session.userEmail = user.email;
        res.redirect('/otp-verification'); // Adjust the path as needed
    } catch (error) {
        res.status(500).send('Server error.');
        res.render('signup', { message: 'An error occurred during registration. Please try again.' });
    }
});


router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body; // Assuming `otp` is the code submitted by the user for verification

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect(`/?message=${encodeURIComponent("User Not Found, kindly signup with your outlook mail id.")}`);
        }

        // Check if OTP has expired
        if (user.otpExpires < Date.now()) {
            // If the OTP is expired, it's a good practice to clear the expired OTP from the database
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();
            return res.redirect(`/otp-verification?message=${encodeURIComponent("OTP expired, please request a new OTP.")}`);
        }

        // Verify OTP
        if (user.otp !== otp) {
            return res.redirect(`/otp-verification?message=${encodeURIComponent("OTP did not match, kindly check you OTP again.")}`);
        }

        // OTP is correct; mark the user as verified
        user.isVerified = true;
        user.otp = undefined; // Clear the OTP fields after successful verification
        user.otpExpires = undefined;
        await user.save();

        // res.json({ message: 'Email verified successfully!' });
        // alert("Email verified successfully, You will return to the login page");
        return res.redirect(`/?message=${encodeURIComponent("Congratulation, your account has been created, you will be redirected to login page now.")}`);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

    

router.post('/resend-otp', async (req, res) => {
    const { email } = req.body;
    console.log(email);

    // Email domain restriction check
    if (!email.endsWith("@adventz.com")) {
        return res.status(400).json({ message: "Resending OTP is only allowed for @adventz.com email addresses." });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.redirect(`/?message=${encodeURIComponent("User Not Found, kindly signup with your outlook mail id.")}`);
        }

        // Generate a new OTP and expiration time
        const newOtp = generateOTP();
        
        // Update the user document with the new OTP and its expiration
        user.otp = newOtp;
        user.otpExpires = new Date(Date.now() + 60000); // Sets OTP to expire in 1 minute
        
        // Save the updated user document
        await user.save();  

        // Resend the OTP via email
        await sendEmail(
            email, 
            'Your New OTP from Adventz', 
            `Hello, your new OTP is: ${newOtp}. It will expire in 1 minute.`
        );

        return res.redirect(`/otp-verification?message=${encodeURIComponent("An OTP has been sent to your email.")}`);
    } catch (error) {
        console.error('Error in resending OTP:', error);
        res.status(500).json({ message: 'Internal server error.' });
    }
});

router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    // Email domain restriction check
    if (!email.endsWith("@adventz.com")) {
        return res.redirect(`/?message=${encodeURIComponent("Login only allowed for Adventz group of companies.")}`);

    }

    try {
        // Attempt to find the user by their email address
        const user = await User.findOne({ email });
        if (!user) {
            // If no user is found, return an error
            return res.redirect(`/?message=${encodeURIComponent("User Not Found, kindly signup with your outlook mail id.")}`);
        }

        // Optional: check if the user has verified their email
        if (!user.isVerified) {
            req.session.userEmail = user.email;
            return res.redirect(`/otp-verification?message=${encodeURIComponent("Your account has not been verified, please verify your account.")}`);
        }

        
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            // If the passwords do not match, return an error
            return res.redirect(`/?message=${encodeURIComponent("Invalid credentials.")}`);
        }

        


        req.session.userEmail = user.email;
        res.redirect('/dashboard');
    
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal server error during login process.' });
    }
});


router.post('/api/auth/submit-form', async (req, res) => {
    try {
      const formData = req.body;
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
      console.log(userEmail);
      const approverEmails = {
        "Tejas Rai": "tejasrai191@gmail.com",
        "Aashutosh": "tejas.rai@adventz.com",
        "Gurudeep": "ankitarai7838@gmail.com",
      };
      const approverEmail = approverEmails[formData["Approver Name"]];
  
      // Modified generatePDF call to include trNumber
      generatePDF(formData, userEmail, trNumber, async pdfPath => {
        console.log(`PDF generated: ${pdfPath}`);
        
        // Send email with PDF attached
        const emailSent = await sendEmail(approverEmail, "Form Submission", `Please find the attached form submission. TR Number: ${trNumber}`, [
          { filename: `TRNumber-${trNumber}-submission.pdf`, path: pdfPath }
        ]);
  
        if(emailSent) {
          console.log('Email with attachment sent successfully and i am here');
          return res.redirect(`/?message=${encodeURIComponent(`Form submitted and email sent to the approver, Your TR number is ${trNumber}`)}`);
        } else {
          console.log('Failed to send email');
          res.status(500).send('Failed to send email.');
        }
      });
    } catch (error) {
      console.error('Error in form submission:', error);
      res.status(500).send('An error occurred.');
    }
  });
  


export default router;
