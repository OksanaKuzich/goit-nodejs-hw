const nodemailer = require("nodemailer");
require("dotenv").config();

const { META_PASSWORD } = process.env;

const sendEmail = async (data) => {
  const email = { ...data, from: "kuzichoksana@meta.ua" };

  const nodemailerConfig = {
    host: "smtp.meta.ua",
    port: 465,
    secure: true,
    auth: {
      user: "kuzichoksana@meta.ua",
      pass: META_PASSWORD,
    },
  };

  const transporter = nodemailer.createTransport(nodemailerConfig);

  try {
    await transporter.sendMail(email);
    return true;
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = sendEmail;
