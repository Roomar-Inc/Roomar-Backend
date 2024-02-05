const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const ownerRouter = require("./routes/ownerRoutes");
const authRouter = require("./routes/authRoutes");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use("/api/v1", ownerRouter);
app.use("/api/v1", authRouter);

module.exports = app;
