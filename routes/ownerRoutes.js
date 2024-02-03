const express = require('express')
const upload = require('../config/multerConfig');
const router = express.Router();
const postController = require('../controllers/postController');
const authController = require('../controllers/authController');

router.post('/create', authController.protect, upload.array('photos', 7), postController.createPosting);
//Update and Delete
router.route('/:id').delete(authController.protect, postController.deletePost).patch(authController.protect, postController.updatePost)


module.exports = router;