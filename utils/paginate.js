const Post = require("../models/postModel");

async function regularPaginate(req, res, arr) {
	try {
		const itemsPerPage = 15;
		const page = parseInt(req.query.page) || 1;
		const firstEl = (page - 1) * itemsPerPage; //0, 15, 30, 45,
		const lastEl = page * itemsPerPage; // 15, 30, 45, 60
		const posts = arr.slice(firstEl, lastEl);
		const totalPostsCount = arr.length;
		let total_pages;
		if (totalPostsCount !== 0 && itemsPerPage > totalPostsCount) {
			total_pages = 1;
		} else total_pages = Math.ceil(totalPostsCount / itemsPerPage);
		if (firstEl >= totalPostsCount) {
			return res.status(400).json({ Error: "This page does not exist " });
		}
		return [totalPostsCount, total_pages, page, posts];
	} catch (err) {
		return res.status(500).json({ Error: "Try again, pagination not working" });
	}
}

async function queryPaginate(req, res, field, query) {
	try {
		const totalPostsCount = await Post.countDocuments(field);
		//Paginate
		const itemsPerPage = 15;
		const page = parseInt(req.query.page) || 1;
		const skip = (page - 1) * itemsPerPage;
		query = query.skip(skip).limit(itemsPerPage);
		const posts = await query;
		if (!posts) return res.status(404).json({ Error: "No posts" });
		let total_pages;
		if (totalPostsCount !== 0 && itemsPerPage > totalPostsCount) {
			total_pages = 1;
		} else total_pages = Math.ceil(totalPostsCount / itemsPerPage);
		if (skip >= totalPostsCount) {
			return res.status(400).json({ Error: "This page does not exist " });
		}
		return [totalPostsCount, total_pages, page, posts];
	} catch (err) {
		return res.status(500).json({ Error: "Try again, pagination not working" });
	}
}

module.exports = { regularPaginate, queryPaginate };
