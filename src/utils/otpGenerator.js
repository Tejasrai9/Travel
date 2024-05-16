// src/utils/otpGenerator.js

// Function to generate a 6-digit OTP
export const generateOTP = () => {
    let otp = '';
    for (let i = 0; i < 6; i++) {
        otp += Math.floor(Math.random() * 10).toString();
    }
    return otp;
};
