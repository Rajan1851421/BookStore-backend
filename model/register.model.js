import mongoose from 'mongoose';

const registerSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true // Ensure email is unique
  },
  password: {
    type: String, // Passwords are generally stored as strings
    required: true
  },
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ['admin', 'user'], // Specify allowed values for type
    required: true
  }
}, {
  timestamps: true  // Corrected option for timestamps
});

const Register = mongoose.model('Register', registerSchema);
export default Register;
