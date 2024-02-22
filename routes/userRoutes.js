const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const postController = require("../controllers/postController");
const { addToWishlist, viewWishlist, deleteFromWishlist } = require("../controllers/userController");

router.get("/ping", (req, res, next) => {
	console.log("go");
});
router.route("/wishlist").get(protect, viewWishlist);
router.route("/wishlist/:id").patch(protect, addToWishlist).delete(protect, deleteFromWishlist);

module.exports = router;
