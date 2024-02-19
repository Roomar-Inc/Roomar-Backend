const MongoClient = require("mongodb").MongoClient;
const assert = require("assert");
async function searchPosts(connectionString, query) {
	const agg = [
		{
			$search: {
				text: {
					query: query,
					path: {
						wildcard: "*",
					},
				},
			},
		},
	];
	const client = await MongoClient.connect(connectionString, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	});
	clientErr = null;
	assert.equal(null, clientErr);

	try {
		const coll = client.db("roomar").collection("posts");
		const cursor = await coll.aggregate(agg);
		let posts = [];
		const docs = await cursor.forEach((doc) => posts.push(doc));
		return posts;
	} finally {
		client.close();
	}
}

module.exports = searchPosts;
