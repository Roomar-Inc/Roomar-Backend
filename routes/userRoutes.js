const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const postController = require("../controllers/postController");
const { addToWishlist, viewWishlist, deleteFromWishlist, totalAnalytics, postAnalytics } = require("../controllers/userController");

router.get("/ping", (req, res, next) => {
	console.log("go");
	res.status(204).end;
});
router.route("/wishlist").get(protect, viewWishlist);
router.route("/wishlist/:id").patch(protect, addToWishlist).delete(protect, deleteFromWishlist);
router.route("/analytics").get(protect, totalAnalytics);
router.route("/analytics/:id").get(protect, postAnalytics);
module.exports = router;
