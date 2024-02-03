const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs')
const userSchema = new mongoose.Schema({
    // firstName: {
    //     type: String, 
    //     required: [true, 'Please input your firstname'], 
    // },
    // lastName:{
    //     type: String, 
    //     required: [true, 'Please input your lastname']
    // },
    name:{
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
    role: {
        type:String,
        enum: []
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

//Hash Password 
userSchema.pre('save', async function(next){
    //ONly run this function if password was actually modified
    if(!this.isModified('password')) return next();

    //Hash the password with cost of 12
    this.password =  await bcrypt.hash(this.password, 12)

    next();
});

//Compare password
userSchema.methods.correctPassword = async function(incomingPassword, storedPassword){
    return await bcrypt.compare(incomingPassword, storedPassword)
};

const User = mongoose.model('User', userSchema)
module.exports = User;