const express = require('express')
const upload = require('../config/multerConfig');
console.log(upload);
const router = express.Router();
const postController = require('../controllers/postController');

router.post('/create', upload.array('image'), postController.createPosting);

module.exports = router;