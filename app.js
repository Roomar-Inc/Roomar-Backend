const express = require('express')
const bodyParser = require('body-parser')
const multer = require('multer');
const cloudinary = require('cloudinary').v2
const ownerRouter = require('./routes/ownerRoutes')
// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

module.exports = cloudinary;

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(bodyParser.json())



app.use('/api/v1', ownerRouter);

module.exports = app;
