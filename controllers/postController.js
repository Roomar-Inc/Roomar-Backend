const sharp = require("sharp");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const cloudinary = require("cloudinary").v2;
const cloud = require("../config/cloudinaryConfig"); //import cloud config
//const upload = require('../config/multerConfig')

exports.createPosting = async (req, res, next) => {
	cloud(); //call the cloudinary config
	const { name, address, description, price, room_number, type, status } = req.body;
	const image = req.files;
	if (!req.files || req.files.length === 0) {
		return res.status(400).json({ error: "No images uploaded" });
	}
	console.log(req.body);
	try {
		const uploads = req.files.map(async (file) => {
			const compressedBuffer = await sharp(file.buffer).webp().resize(450, 450, "contain").webp({ compressionLevel: 9 }).toBuffer();
			const base64EncodedImage = compressedBuffer.toString("base64");
			const dataUri = `data:image/webp;base64,${base64EncodedImage}`;
			const response = await cloudinary.uploader.upload(dataUri);
			return response.url; // Modify the response object if needed
		});

		const links = await Promise.all(uploads);
		const post = await Post.create({
			user_id: req.user._id,
			name,
			address,
			description,
			price,
			room_number,
			type,
			photos: [links],
		});
		return res.status(200).json(post);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ Error: err });
	}
};

//Delete post including the images in cloudinary
exports.deletePost = async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (!post) return res.status(401).json({ error: "Post not found" });

	if (!(req.user._id == post.user_id)) {
		return res.status(401).json({ error: "Can't perform action! You don't own this post" });
	}

	const links = post.photos[0];
	const assetId = [];
	for (const i of links) {
		const parts = i.split(/[/\.]/);
		const str = parts[parts.length - 2];
		assetId.push(str);
	}
	console.log(assetId);
	try {
		cloud(); //cloudinary config
		for (const i of assetId) {
			await Post.findByIdAndDelete(req.params.id);
			await cloudinary.uploader.destroy(i);
		}
		res.status(204).end();
	} catch (err) {
		res.status(404).json({ error: "Post not deleted", err });
	}
};

exports.updatePost = async (req, res) => {
	const post = await Post.findById(req.params.id);
	if (!post) return res.status(404).json({ error: "Post not found" });
	try {
		if (!(req.user._id == post.user_id)) {
			return res.status(401).json("Can't perform action! You don't own this post");
		}
		const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({ updatedPost });
	} catch (err) {
		res.status(404).json({
			status: "fail",
			message: err,
		});
	}
};

//exports.getUserPosts = async (req, res, next) => {};
//Make post unavailable
//Add to wishlist
