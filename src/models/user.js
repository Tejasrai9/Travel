    import mongoose from 'mongoose';
    import bcrypt from 'bcrypt';

    const userSchema = new mongoose.Schema({
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true,
            validate: {
                validator: function(email) {
                    return /@adventz\.com$/.test(email);
                },
                message: props => `${props.value} is not a valid email address for registration. Only @adventz.com emails are allowed.`
            }
        },
        
        password: {
            type: String,
            required: true,
        },
        otp: {
            type: String,
            //  required: false
        },
        otpExpires: {
            type: Date,
            // required: false
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        // You can add more fields as needed
    });

    // Pre-save hook to hash password before saving a user
    userSchema.pre('save', async function(next) {
        if (!this.isModified('password')) return next();

        try {
            const salt = await bcrypt.genSalt(10);
            this.password = await bcrypt.hash(this.password, salt);
            next();
        } catch (error) {
            next(error);
        }
    });

    // Method to compare provided password with hashed password in the database
    userSchema.methods.comparePassword = async function(candidatePassword) {
        return await bcrypt.compare(candidatePassword, this.password);
    };

    const User = mongoose.model('User', userSchema);

    export default User;
