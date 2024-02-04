const express = require("express");
const upload = require("../config/multerConfig");
const router = express.Router();
const postController = require("../controllers/postController");
const authController = require("../controllers/authController");

//router.post('/create', upload.array('photos', 7), postController.createPosting
router.post("/login", authController.login);
router.post("/signup", authController.signup);
router.post("/password", authController.protect, authController.changePassword);
router.post("/forgotPassword");
router.patch("/resetPassword:token");

router.route("/profile").patch().get();
module.exports = router;
