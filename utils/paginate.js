async function paginate(req, res, arr) {
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
}

module.exports = paginate;
