const User = require("../models/userModel");
const Post = require("../models/postModel");

//Comment on post
//Delete your comment

//Add to Wishlist
exports.addToWishlist = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(req.user._id, { $addToSet: { wishlist: req.params.id } }, { new: true });

		res.status(201).json({
			message: "Add to wishlist successful",
		});
	} catch (err) {
		res.status(400).json({ Error: "Error adding to wishlist, try again " });
	}
};

//View Wishlist
exports.viewWishlist = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		const postIds = user.wishlist;
		//pagination
		if (req.query.page === 0 || req.query.page < 0) {
			return res.status(400).json({ Error: "Not a vaild page range" });
		}

		const page = parseInt(req.query.page) * 1 || 1;
		const limit = req.query.limit * 1 || 15;
		const skip = (page - 1) * limit;
		const total = await Post.countDocuments({ _id: { $in: postIds } });

		let pages;
		total !== 0 && limit > total ? (pages = 1) : (pages = Math.ceil(total / limit));
		if (skip >= total) return res.status(404).json({ Error: "This page does not exist" });

		const posts = await Post.find({ _id: { $in: postIds } })
			.skip(skip)
			.limit(limit);

		res.status(200).json({
			total,
			pages,
			page,
			posts,
		});
	} catch (err) {
		res.status(500).json({ Error: "Error fetching wishlist" });
	}
};

//Delete from Wishlist
exports.deleteFromWishlist = async (req, res, next) => {
	try {
		const user = await User.findByIdAndUpdate(
			req.user._id,
			{ $pull: { wishlist: req.params.id } },
			{ new: true } // Return the updated document
		);
		res.status(204).end();
	} catch (err) {
		res.status(400).json({ Error: "Request unsuccessful, try again!" });
	}
};

//Get Profile information
exports.getProfile = async (req, res, next) => {
	try {
		const user = req.user;
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err });
	}
};

//Update Profile Information
exports.updateProfile = async (req, res, next) => {
	try {
		if (req.body.password || req.body.email || req.body.role) {
			return res.status(400).json("Fields can't be updated via this route");
		}

		const user = await User.findByIdAndUpdate(req.user._id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json(user);
	} catch (err) {
		res.status(404).json({ message: err });
	}
};

//Change existing password
exports.changePassword = async (req, res, next) => {
	// 1) Get user from collection
	try {
		const user = await User.findById(req.user._id).select("+password");

		//2) Check if POSTed current password is correct
		if (!(await user.correctPassword(req.body.current_password, user.password))) {
			return res.status(401).json({
				status: "fail",
				message: "Your current password is wrong",
			});
		}
		//3) If so, update Password
		user.password = req.body.new_password;
		user.passwordChangedAt = Date.now();
		await user.save();
		res.status(200).json({ message: "Password successfully changed" });
	} catch (err) {
		return res.status(401).json({
			status: "fail",
			message: err,
		});
	}
};

exports.totalAnalytics = async (req, res, next) => {
	//Get id of the user
	//Get all users post and and return all viewed by fields
	const posts = await Post.find({ _id: { $in: postIds } });
	//Or return the count of all fields
	//or return each post and the number of clicks
};

exports.postAnalytics = async (req, res, next) => {
	//Get Id from the request
	//Get the length of the viewedBy field and return it
	// try {
	const { user_id, viewedBy } = await Post.findById(req.params.id, { viewedBy: 1, user_id: 1 });
	if (req.user._id !== user_id) return res.status(403).json({ message: "You do not own this post" });
	if (!viewedBy) return res.status(404).json({ message: "No clicks recorded for this post" });
	const clicks = viewedBy.length;
	res.status(200).json({
		clicks,
	});
	// } catch (err) {
	// 	res.status(400).json({ Error: "Unable to retrieve analytics, try again!" });
	// }
};
