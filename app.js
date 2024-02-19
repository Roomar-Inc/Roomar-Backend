const express = require("express");
const bodyParser = require("body-parser");
const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const postRouter = require("./routes/postRoutes");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const cors = require("cors");
const app = express();

try {
	app.use(cors());
	app.use(express.json());
	app.use(express.urlencoded({ extended: true }));
	app.use(bodyParser.json());

	app.use("/api/v1", postRouter);
	app.use("/api/v1", authRouter);
	app.use("/api/v1", userRouter);
} catch (err) {
	return res.status(500).json({
		Error: "Issue with middleware",
		err,
	});
}
module.exports = app;
