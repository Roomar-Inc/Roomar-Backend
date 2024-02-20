const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
	{
		user_id: {
			type: String,
			required: [true, "Provide user id"],
		},
		name: {
			type: String,
			required: [true, "Please input product name"],
		},
		address: {
			type: String,
			required: [true, "Please provide property address"],
		},
		contact: {
			type: String,
			required: [true, "Please provide contact"],
		},
		description: {
			type: String,
		},
		price: {
			type: Number,
			required: [true, "Please provide price"],
		},
		type: {
			type: String,
			enum: ["furnished", "unfurnished"],
			required: [true, "Please provide type"],
		},
		status: {
			type: String,
			enum: ["available", "unavailable"],
			default: "available",
		},
		photos: {
			type: Array,
			required: [true, "Upload photos of your property"],
			//max of 10
			//add an alt to an image
		},
	},
	{
		timestamps: true,
	}
);

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
