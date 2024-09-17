import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Register from '../model/register.model.js';

// Secret key for JWT (use a more secure key in production)
const JWT_SECRET = 'rajan'; 

// User Registration
export const registerUser = async (req, res) => {
  const { email, password, name, type } = req.body;

  try {
    // Check if user already exists
    const existingUser = await Register.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create new user
    const newUser = new Register({
      email,
      password: hashedPassword,
      name,
      type
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// delete user by id

export const deleteUserById =async()=>{
    const {id} = req.params
    try {
    
        const deleteUser = await User.findOneAndDelete(id);   
        if (!deleteUser) {
          return res.status(404).json({ message: "User not Found" });
        }
        res.status(200).json({ message: "User deleted successfully!", user: deleteUser });
      } catch (error) {
       
        res.status(500).json({ error: error.message });
      }
}

// get all user 

export const fetchAllUser = async (req, res) => {
    try {
      const allUser = await Register.find();
      res.status(200).json(allUser);
    } catch (error) {
      res.status(500).json({
        error: error.message,
      });
    }
  };
// User Login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const user = await Register.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id, type: user.type }, JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({ token,type:user.type, message: 'Login successful' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
