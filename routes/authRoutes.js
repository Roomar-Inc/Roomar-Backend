const express = require("express");
const upload = require("../config/multerConfig");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");
const userController = require("../controllers/userController");

router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.patch("/password", authController.protect, userController.changePassword);
router.post("/forgotPassword", authController.forgotPassword);
router.post("/verifyOTP", authController.verifyOTP);
router.patch("/resetPassword", authController.resetPassword);

router.route("/profile").patch(authController.protect, userController.updateProfile).get(authController.protect, userController.getProfile);
module.exports = router;
