//Add to wishlist -post
//View wishlist -get
//Delete from wishlist - delete

//Comment on post
//Delete your comment

//Add to Wishlist
exports.addtoWishlist = async (req, res, next) => {
	//Get user id
	const user = await User.findById(req.user.id);
	// Get post id
	// Save to wishlist
	//Create an array in the user schema for wishlist and add the post id to it
};

//View Wishlist
exports.viewWishlist = async (req, res, next) => {};

//Delete from Wishlist
exports.deletefromWishlist = async (req, res, next) => {};
