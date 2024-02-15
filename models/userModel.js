const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const userSchema = new mongoose.Schema(
	{
		// firstName: {
		//     type: String,
		//     required: [true, 'Please input your firstname'],
		// },
		// lastName:{
		//     type: String,
		//     required: [true, 'Please input your lastname']
		// },
		name: {
			type: String,
			required: [true, "Please input your fullname"],
		},
		username: {
			type: String,
			required: [true, "Please input your username"],
			unique: true,
			// This removes leading and trailing white spaces
			validate: {
				validator: function (value) {
					// Use a regular expression to check if there are any white spaces
					return !/\s/.test(value);
				},
				message: "Username must not contain white spaces.",
			},
		},
		email: {
			type: String,
			required: [true, "Please provide an email address"],
			unique: true,
			validate: [validator.isEmail, "Please provide a valid email"],
		},
		role: {
			type: String,
			required: [true, "Provide user role"],
			enum: ["owner", "seeker"],
		},
		gender: {
			type: String,
			enum: ["Male", "Female"],
		},
		photo: String,
		password: {
			type: String,
			required: [true, "Please provide a password"],
			minlength: 8,
			select: false,
		},
		phone: {
			type: String,
			required: [true, "Please provide your phone number"],
		},
		wishlist: {
			type: Array,
		},
		passwordChangedAt: Date,
		passwordResetToken: String,
		passwordResetExpires: Date,
		otpJwt: String,
		otpJwtExpires: Date,
	},
	{
		timestamps: true,
	}
);

//Hash Password
userSchema.pre("save", async function (next) {
	//ONly run this function if password was actually modified
	if (!this.isModified("password")) return next();

	//Hash the password with cost of 12
	this.password = await bcrypt.hash(this.password, 12);

	next();
});

//Compare password
userSchema.methods.correctPassword = async function (incomingPassword, storedPassword) {
	return await bcrypt.compare(incomingPassword, storedPassword);
};

//Create OTP
userSchema.methods.createPasswordResetToken = function () {
	const resetToken = String(Math.floor(Math.random() * 900000 + 100000));
	this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex");
	//console.log({resetToken}, this.passwordResetToken)
	this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
	return resetToken;
};

//Check if OTP has expired
userSchema.methods.checkOtp = function (expiration) {
	if (Date.now() > Date.parse(expiration)) {
		return true;
	}
};

const User = mongoose.model("User", userSchema);
module.exports = User;
