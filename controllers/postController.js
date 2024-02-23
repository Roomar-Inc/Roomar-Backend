const sharp = require("sharp");
const User = require("../models/userModel");
const Post = require("../models/postModel");
const cloudinary = require("cloudinary").v2;
const cloud = require("../config/cloudinaryConfig"); //import cloud config
//const upload = require('../config/multerConfig')
const searchPosts = require("../utils/query");
exports.createPost = async (req, res, next) => {
	try {
		cloud(); //call the cloudinary config
		const { name, address, town, description, price, room_number, type, status, contact } = req.body;
		const image = req.files;
		console.log(req.files);
		// if (!req.files || req.files.length === 0) {
		// 	return res.status(400).json({ error: "No images uploaded" });
		// }

		const uploads = req.files.map(async (file) => {
			const compressedBuffer = await sharp(file.buffer).webp().resize(450, 450, "contain").webp({ compressionLevel: 9 }).toBuffer();
			const base64EncodedImage = compressedBuffer.toString("base64");
			const dataUri = `data:image/webp;base64,${base64EncodedImage}`;
			const response = await cloudinary.uploader.upload(dataUri);
			return response.url;
		});

		const links = await Promise.all(uploads);
		const post = await Post.create({
			user_id: req.user._id,
			name,
			address,
			town,
			contact,
			description,
			price,
			room_number,
			status,
			type,
			photos: links,
		});
		return res.status(201).json({
			post,
		});
	} catch (err) {
		return res.status(400).json({ Error: err });
	}
};

//Delete post including the images in cloudinary
exports.deletePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ error: "Post not found" });

		if (!(req.user._id == post.user_id)) {
			return res.status(403).json({ error: "Can't perform action! You don't own this post" });
		}

		const links = post.photos;
		const assetId = [];
		for (const i of links) {
			const parts = i.split(/[/\.]/);
			const str = parts[parts.length - 2];
			assetId.push(str);
		}

		cloud(); //cloudinary config
		for (const i of assetId) {
			await Post.findByIdAndDelete(req.params.id);
			await cloudinary.uploader.destroy(i);
		}
		res.status(204).end();
	} catch (err) {
		res.status(404).json({ error: "Did not work, try again", err });
	}
};

//Update post details except images, also make post unavailable
exports.updatePost = async (req, res) => {
	try {
		const post = await Post.findById(req.params.id);
		if (!post) return res.status(404).json({ error: "Post not found" });

		if (!(req.user._id == post.user_id)) {
			return res.status(403).json("Can't perform action! You don't own this post");
		}
		const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
			new: true,
			runValidators: true,
		});
		res.status(200).json({ updatedPost });
	} catch (err) {
		res.status(400).json({
			message: err,
		});
	}
};
//Get Single Post
exports.getPost = async (req, res, next) => {
	//Create a value in the post schema to hold no. of times viewed
	//Check if the user.id exists if not add to the list of values in the schema
	//Return the count of that particular field
	try {
		const post = await Post.findOneAndUpdate({ _id: req.params.id }, { $addToSet: { viewedBy: req.user._id } }, { new: true, upsert: false });

		// const post = await Post.findById(req.params.id);
		// const viewedBy = await User.findByIdAndUpdate(req.params.id, { $addToSet: { viewedBy: req.user._id } }, { new: true });
		res.status(200).json(post);
	} catch (err) {
		res.status(404).json({ error: "Post not found" });
	}
};

//Get All Post Based on a User
exports.getUserPosts = async (req, res, next) => {
	try {
		if (req.query.page === 0 || req.query.page < 0) {
			return res.status(400).json({ Error: "Not a vaild page range" });
		}

		const page = req.query.page * 1 || 1;
		const limit = req.query.limit * 1 || 15;
		const skip = (page - 1) * limit;
		const total = await Post.countDocuments({ user_id: req.user._id });

		let pages;
		total !== 0 && limit > total ? (pages = 1) : (pages = Math.ceil(total / limit));

		if (skip > total) return res.status(400).json({ Error: "This page does not exist" });

		const posts = await Post.find({ user_id: req.user._id }).sort({ createdAt: -1 }).skip(skip).limit(limit);

		if (!posts || !posts.length) return res.status(404).json({ error: "No posts from this user" });
		res.status(200).json({
			total,
			pages,
			page,
			posts,
		});
	} catch (err) {
		return res.status(404).json({ error: "Error retrieving posts. Try again!" });
	}
};

exports.getAllPosts = async (req, res, next) => {
	try {
		//Filter by type,location, status, price

		if (req.query.page === 0 || req.query.page < 0) {
			return res.status(400).json({ Error: "Not a vaild page range" });
		}

		const page = parseInt(req.query.page) * 1 || 1;
		const limit = req.query.limit * 1 || 15;
		const skip = (page - 1) * limit;
		const total = await Post.countDocuments(queryObj);

		let pages;
		total !== 0 && limit > total ? (pages = 1) : (pages = Math.ceil(total / limit));

		if (skip >= total) return res.status(404).json({ Error: "This page does not exist" });

		const queryObj = { ...req.query };
		const excludedFields = ["page", "sort", "limit", "fields"];
		excludedFields.forEach((el) => delete queryObj[el]);

		let query;

		//Checks if there are filter fields
		if (Object.keys(queryObj).length > 0) {
			query = Post.find(queryObj).sort({ createdAt: -1 }).skip(skip).limit(limit);
		} else {
			query = Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
		}

		const posts = await query;

		//pagination
		res.status(200).json({
			total,
			pages,
			page,
			posts,
		});
	} catch (err) {
		res.status(404).json({ error: "Post not found", err });
	}
};

exports.search = async (req, res, next) => {
	try {
		const DB = process.env.DB;
		const { s } = req.query;
		const items = await searchPosts(DB, s); //atlas search
		if (!items) return res.status(404).json({ message: "No Posts" });

		if (req.query.page === 0 || req.query.page < 0) {
			return res.status(400).json({ Error: "Not a vaild page range" });
		}

		const limit = 15;
		const page = parseInt(req.query.page) || 1;
		const firstEl = (page - 1) * limit; //0, 15, 30, 45,
		const lastEl = page * limit; // 15, 30, 45, 60
		const posts = items.slice(firstEl, lastEl);
		const total = items.length;
		let pages;
		total !== 0 && limit > total ? (pages = 1) : (pages = Math.ceil(total / limit));
		if (firstEl >= total) {
			return res.status(400).json({ Error: "This page does not exist" });
		}
		res.status(200).json({
			total,
			pages,
			page,
			posts,
		});
	} catch (err) {
		res.status(404).json({ Error: "Item not found" });
	}
};
//User profile
//Add to wishlist
//Filter by Furnished, Unfurnished, Eziobodo, Umuchima, Ihiagwa
//Search by keyword
