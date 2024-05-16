import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS, // Use your App Password here if you've set up 2-Step Verification
    },
});

// Modify sendEmail to accept an attachments parameter
export const sendEmail = async (to, subject, text, attachments = []) => {
    try {
        if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            console.error("Email user or password not set in .env");
            return false; // Indicate failure
        }

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            text: text,
            // If you want to use HTML content instead of plain text
            // html: "<p>Your HTML content here.</p>",
            attachments: attachments, // Attachments array
        });

        console.log('Email sent successfully');
        return true; // Indicate success
    } catch (error) {
        console.error('Error sending email:', error);
        return false; // Indicate failure
    }
};
