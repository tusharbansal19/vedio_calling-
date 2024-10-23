const {User} = require('../model/model'); // Adjust the path as needed
const bcrypt = require('bcryptjs');// Adjust the path as needed
const jwt = require('jsonwebtoken');
require('dotenv').config();
// Signup Function


exports.signup = async (req, res) => {
  const { name, password, email, } = req.body;

  try {
    if(!name||!name||!email)
        return res.status(401).json({ message: 'Invalid credentials' });
    // Check if the user already exists
    console.log("email ",email)

    
    const existingUser = await User.findOne({ email, });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already in use' });
    }
    console.log("email ",email)

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("email ",hashedPassword)

    // Create a new user
    const newUser = new User({
      name,
      password: hashedPassword,
      email,
      schedule:[] // Add the schedule if provided
    });
    console.log("email ",newUser)

    await newUser.save();
    console.log("email ",newUser)

    const token = jwt.sign({ user:newUser }, process.env.JWT_SECRET, {
        expiresIn: '1h', // Token expires in 1 hour
      });
      console.log("lat check ",token)

      res.json({
        token,
        email,
      });
  } catch (error) {
    res.status(500).json({ message: 'User registration failed', error });
  }
};

// Login Function
exports.login = async (req, res) => {

  const { email, password } = req.body;

  try {
    // Find the user by email
    if(!email)
        return res.status(401).json({ message: 'Invalid credentials' });

    const user = await User.findOne({ email, });console.log("user"+user)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }


    // Compare the password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
console.log(isPasswordValid);
    // Generate JWT token
    const token = jwt.sign({ user:user }, process.env.JWT_SECRET, {
      expiresIn: '1h', // Token expires in 1 hour
    });

console.log(token)
    res.json({
      token,
      email,
    });
  } catch (error) {
    res.status(500).json({ message: 'Login failed', error });
  }
};
