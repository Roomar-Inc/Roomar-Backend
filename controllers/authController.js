const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const sendEmail = require("../utils/email");

const createToken = (id) => {
	return jwt.sign({ id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRES_IN,
	});
};

const createAndSendToken = (user, statusCode, res, text) => {
	const token = createToken(user._id);
	user.password = undefined;
	res.header("Authorization", `Bearer ${token}`);
	res.status(statusCode).json({
		data: {
			token,
			user,
		},
	});
};

exports.protect = async (req, res, next) => {
	//1) Get token and check if its there
	try {
		let token;
		if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
			token = req.headers.authorization.split(" ")[1];
		}

		if (!token) {
			return next(res.status(401).json({ message: "You are not logged in. Please log in to gain access!" }));
		}

		//2) Verifying token
		let decoded;
		try {
			decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
		} catch (err) {
			return res.status(401).json({
				status: "fail",
				message: ["Invalid token, Please log in again!"],
			});
		}

		//3) Check if user still exists
		const currentUser = await User.findById(decoded.id);
		if (!currentUser) {
			return res.status(401).json({
				status: "fail",
				message: "The user belonging to this token does not exist",
			});
		}

		// 4) Check if user changed password after the token was issued
		// if(currentUser.changedPasswordAfter(decoded.iat)){
		//     return res.status(401).json({
		//         status: 'fail',
		//         message: "User recently changed password! Please log in again!"
		//     })
		//}
		//GRANT ACCESS
		req.user = currentUser;
		next();
	} catch (err) {
		return res.status(500).json(err);
	}
};

exports.signup = async (req, res, next) => {
	try {
		const newUser = await User.create({
			name: req.body.name,
			email: req.body.email,
			username: req.body.username,
			phone: req.body.phone,
			gender: req.body.gender,
			password: req.body.password,
			role: req.body.role,
			passwordChangedAt: Date.now(),
		});

		createAndSendToken(newUser, 201, res);
	} catch (err) {
		res.status(400).json({ error: "Invalid signup request. Please check your input.", err });
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		// 1) Check if email and password exists
		if (!email || !password) {
			return res.status(401).json({
				status: "fail",
				message: "Please provide email and password",
			});
		}

		// 2) Check if user & password exists
		const user = await User.findOne({ email }).select("+password");
		if (!user || !(await user.correctPassword(password, user.password))) {
			return res.status(401).json({
				status: "fail",
				message: "Incorrect email or password",
			});
		}

		//3) If it's okay, send token to client
		createAndSendToken(user, 200, res);
	} catch (err) {
		res.status(400).json(err);
	}
};

exports.restrictTo = (...roles) => {
	try {
		return (req, res, next) => {
			if (!roles.includes(req.user.role)) {
				return next(res.status(403).json({ message: "You do not have permission to perform this action" }));
			}
			next();
		};
	} catch (err) {
		return res.status(500).json(err);
	}
};

//Sends OTP to Mail
exports.forgotPassword = async (req, res, next) => {
	try {
		// 1) Get user based on posted email
		const user = await User.findOne({ email: req.body.email });
		if (!user) {
			return next(res.status(404).json({ message: "There is no user with this email address" }));
		}
		// 2) Generate the random user token
		const otp = user.createPasswordResetToken();
		await user.save({ validateBeforeSave: false });

		//3) Send it to user's email
		const message = `Your OTP \n ${otp}.\n If you didn't request this, Please ignore this email!`;

		try {
			await sendEmail({
				email: user.email,
				subject: "Your password reset token (valid for 10min)",
				message,
			});

			res.status(200).json({
				message: "Token sent to email!",
			});
		} catch (err) {
			user.passwordResetToken = undefined;
			user.passwordResetExpires = undefined;
			await user.save({ validateBeforeSave: false });

			return res.status(200).json({
				status: "fail",
				message: err,
			});
		}
	} catch (err) {
		res.status(400).json(err);
	}
};

//Verifies OTP, send jwt to be carried to the next screen and checked
exports.verifyOTP = async (req, res, next) => {
	try {
		const hashedToken = crypto.createHash("sha256").update(req.body.otp).digest("hex");
		const user = await User.findOne({ passwordResetToken: hashedToken });
		if (!user) {
			return res.status(403).json("Invalid or Expired OTP");
		}
		if (user.checkOtp(user.passwordResetToken)) {
			return res.status(400).json("Invalid or Expired OTP");
		}
		//Sign, save and send token
		const token = createToken(user._id);
		user.otpJwt = token;
		user.otpJwtExpires = Date.now() + 10 * 60 * 1000;
		await user.save();
		res.status(200).json({
			message: "OTP verified successfully",
			resetToken: token,
		});
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		user.otpJwt = undefined;
		user.otpJwtExpires = undefined;
		await user.save();
		res.status(400).json("Unsuccessful, try again!");
	}
};

exports.resetPassword = async (req, res, next) => {
	try {
		const { resetToken } = req.body;
		const user = await User.findOne({ otpJwt: resetToken });
		if (!user) return res.status(404).json("Invalid token");

		user.checkOtp(user.otpJwtExpires);
		if (!req.body.new_password) return res.status(400).json("Provide new password");

		user.password = req.body.new_password;
		user.passwordChangedAt = Date.now();
		user.otpJwt = undefined;
		user.otpJwtExpires = undefined;
		user.passwordResetToken = undefined;
		user.passwordExpires = undefined;
		await user.save();
		//user.password = undefined;
		createAndSendToken(user, 201, res);
	} catch (err) {
		user.passwordResetToken = undefined;
		user.passwordResetExpires = undefined;
		user.otpJwt = undefined;
		user.otpJwtExpires = undefined;
		res.status(400).json(err);
	}
};
