const { User } = require("../models/user");
const sendEmail = require("../helpers/sendEmail");

const checkVerify = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: "Missing required field email",
    });
  }

  const user = await User.findOne({ email });

  if (user.verify) {
    res.status(400).json({
      status: "Bad Request",
      code: 400,
      message: "Verification has already been passed",
    });
  }

  const mail = {
    to: email,
    subject: "Подтверждение",
    html: `<a target="_blank" href='http://localhost:3000/api/users/verify/${user.verificationToken}'>Перейдите по ссылке для подтверждения электронного адреса</a>`,
  };

  sendEmail(mail);

  res.status(200).json({
    status: "ok",
    code: 200,
    message: "Verification email sent",
  });
};

module.exports = checkVerify;
