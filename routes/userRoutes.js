const express = require("express");
const router = express.Router();
const { protect } = require("../controllers/authController");
const postController = require("../controllers/postController");
const { addToWishlist, viewWishlist, deleteFromWishlist } = require("../controllers/userController");

router.route("/wishlist/:id").patch(protect, addToWishlist).get(protect, viewWishlist).delete(protect, deleteFromWishlist);

module.exports = router;
