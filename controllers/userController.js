const User = require("../models/userModel");
const Post = require("../models/postModel");
//Add to wishlist -post
//View wishlist -get
//Delete from wishlist - delete

//Comment on post
//Delete your comment

//Add to Wishlist
exports.addToWishlist = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		//Get user id
		const postId = req.params.id;
		user.wishlist.push(postId);
		await user.save();
		res.status(201).json({
			message: "Add to wishlist successful",
		});
	} catch (err) {
		res.status(400).json({ Error: "Error adding to wishlist, try again " });
	}

	// Get post id
	// Save/Push to wishlist
	//Create an array in the user schema for wishlist and add the post id to it
};

//View Wishlist
exports.viewWishlist = async (req, res, next) => {
	const user = await User.findById(req.user._id);
	//retrieve user id and the wishlist array
	//loop, check for the ids in the Posts and return
};

//Delete from Wishlist
exports.deleteFromWishlist = async (req, res, next) => {
	try {
		const user = await User.findById(req.user._id);
		const postId = req.params.id.toString();
		let index;
		if (user.wishlist.includes(postId)) {
			index = user.wishlist.indexOf(postId);
		} else return res.status(404).json({ message: "Post not found" });
		user.wishlist.splice(index, 1);
		console.log(user.wishlist);
		await user.save();
		res.status(204);
	} catch (err) {
		res.status(400).json({ Error: "Request unsuccessful, try again!" });
	}
};
