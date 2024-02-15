const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
	// 1) Create a transporter
	const transporter = nodemailer.createTransport({
		service: "gmail",
		auth: {
			user: process.env.GMAIL_NAME,
			pass: process.env.GMAIL_PASSWORD,
		},
	});

	//2) Define the email options
	const mailOptions = {
		from: "Roomar <roomar.io>",
		to: options.email,
		subject: options.subject,
		text: options.message,
		//html:
	};

	//3) Actually send the email
	await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
