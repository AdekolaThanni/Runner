const nodemailer = require("nodemailer");

module.exports = async (options) => {
  // Create transporter
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  // 2) Define the email options
  const mailOptions = {
    from: "Adekola Thanni <adekolathanni@gmail.com>",
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  console.log(mailOptions);

  await transporter.sendMail(mailOptions);
};
