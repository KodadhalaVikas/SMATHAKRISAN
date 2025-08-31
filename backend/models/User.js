const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  dateOfBirth: {
    type: Date,
    required: true
  },
  country: {
    type: String,
    required: true
  },
  mobile: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,  // Ensures email uniqueness at the database level
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.']  // Regex pattern validation
  },
  password: {
    type: String,
    required: true
    
  },
  profilePicture: String
}, { collection: 'users_details' });

const User = mongoose.model('User', userSchema);

module.exports = User;
