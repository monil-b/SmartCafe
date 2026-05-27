const SibApiV3Sdk = require("sib-api-v3-sdk");

const sendEmail = async (options) => {
  try {
    const client = SibApiV3Sdk.ApiClient.instance;

    const apiKey = client.authentications["api-key"];
    apiKey.apiKey = process.env.BREVO_API_KEY;

    const tranEmailApi = new SibApiV3Sdk.TransactionalEmailsApi();

    await tranEmailApi.sendTransacEmail({
      sender: {
        email: "monilintech@gmail.com",
        name: "SmartCafe",
      },
      to: [
        {
          email: options.email,
        },
      ],
      subject: options.subject,
      textContent: options.message,
    });

    console.log("EMAIL SENT");
  } catch (error) {
    console.log("EMAIL ERROR:", error);
    throw error;
  }
};

module.exports = sendEmail;