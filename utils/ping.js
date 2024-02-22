const axios = require("axios");

function pingServer() {
	const endpoint = "https://roomar-backend.onrender.com/api/v1/ping";

	axios
		.get(endpoint)
		.then((response) => {
			console.log(`Server pinged successfully at ${new Date()}`);
			// Process the response as needed
		})
		.catch((error) => {
			console.error(`Error pinging the server: ${error.message}`);
		});
}

module.exports = pingServer;
