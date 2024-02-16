const express = require("express");
const upload = require("../config/multerConfig");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

router.post("/create", authController.protect, authController.restrictTo("owner"), upload.array("photos", 7), postController.createPost);
//Update and Delete

router
	.route("/post/:id")
	.delete(authController.protect, authController.restrictTo("owner"), postController.deletePost)
	.patch(authController.protect, authController.restrictTo("owner"), postController.updatePost)
	.get(authController.protect, postController.getPost);

router.route("/posts").get(authController.protect, authController.restrictTo("owner"), postController.getUserPosts);
router.route("/").get(postController.getAllPosts);
module.exports = router;
