const mongoose = require("mongoose");
const dotenv = require("dotenv");
const app = require("./app");
//const swaggerComments = require("./swaggerComments");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");
dotenv.config({ path: "./config.env" });

// Initialize Database
mongoose
	.connect(process.env.DB, {
		useNewUrlParser: true,
	})
	.then((con) => {
		console.log("DB connection successful!");
	});

const port = process.env.PORT || 4000;

const options = {
	definition: {
		openapi: "3.1.0",
		info: {
			title: "Roomar Backend API Documentation",
			version: "1.0.0",
			description: "I'd say more later",
		},
		servers: [
			{
				url: "https://roomar-backend.onrender.com",
			},
		],
	},
	apis: ["./routes/*.js"],
};

const specs = swaggerJsdoc(options);
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs, { explorer: true }));
app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
