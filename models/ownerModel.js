const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String, 
        required: [true, 'Please input your firstname'], 
    },
    lastName:{
        type: String, 
        required: [true, 'Please input your lastname']
    },
    username:{
        type: String, 
        required: [true, 'Please input your username'],
        unique: true,
         // This removes leading and trailing white spaces
        validate: {
          validator: function(value) {
            // Use a regular expression to check if there are any white spaces
            return !/\s/.test(value);
          },
          message: 'Username must not contain white spaces.'
        }
    },
    email:{
        type: String, 
        required: [true, 'Please provide an email address'],
        unique: true,
        validate: [validator.isEmail, 'Please provide a valid email']
    },
    gender:{
        type: String, 
        enum: ['Male', 'Female']
    },
    photo: String, 
    password: {
        type: String, 
        required: [true, 'Please provide a password'],
        minlength: 8,
        select: false
    },
    phone:{
        type: String,
        required: [true, 'Please provide your phone number']
    },
    passwordChangedAt: Date,
    passwordResetToken: String, 
    passwordResetExpires: Date
});

const Owner = mongoose.model('Owner', userSchema)
    
module.exports = Owner