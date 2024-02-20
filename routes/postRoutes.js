const express = require("express");
const upload = require("../config/multerConfig");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

router.post("/post", authController.protect, upload.array("photos", 7), postController.createPost);
//Update and Delete

router
	.route("/post/:id")
	.delete(authController.protect, authController.restrictTo("owner"), postController.deletePost)
	.patch(authController.protect, authController.restrictTo("owner"), postController.updatePost)
	.get(authController.protect, postController.getPost);

router.route("/posts").get(authController.protect, postController.getUserPosts);
router.route("/").get(postController.getAllPosts);
router.route("/search").get(postController.search);
module.exports = router;
