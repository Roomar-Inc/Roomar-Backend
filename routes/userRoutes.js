const express = require("express");
const router = express.Router();

router
	.route("/wishlist")
	.post(authController.protect, postController.addtoWishlist)
	.get(authController.protect, postController.getWishlist)
	.delete(authController.protect, postController.deleteWishlist);

module.exports = router;
