const nodemailer = require("nodemailer");

const sendEmail = async (options) => {
  try {
    const transporter = nodemailer.createTransport({
      host: "smtp-relay.brevo.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.BREVO_EMAIL,
        pass: process.env.BREVO_PASS,
      },
    });

    await transporter.sendMail({
      from: "monilintech@gmail.com",
      to: options.email,
      subject: options.subject,
      text: options.message,
    });

    console.log("EMAIL SENT");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendEmail;