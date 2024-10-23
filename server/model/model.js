const mongoose = require('mongoose');
require('dotenv').config();
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is required
  },
  password: {
    type: String,
    required: true, // Password is required
  },
  email: {
    type: String,
    required: true, // Email is required
    unique: true, // Email must be unique
  },
  schedule: mongoose.Schema.Types.Array, // Array of schedule items
}, { timestamps: true });


let User = mongoose.model('User', UserSchema);


const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
   
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  }
};


// Export the User model
module.exports ={User:User,connectDB,}
