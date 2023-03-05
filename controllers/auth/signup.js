const { User } = require("../../models/user");
const bcrypt = require("bcryptjs");
const gravatar = require("gravatar");
const { v4 } = require("uuid");
const sendEmail = require("../../helpers/sendEmail");

const register = async (req, res) => {
  const { email, password, subscription } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    res.status(409).json({
      status: "conflict",
      code: 409,
      message: "Email in use",
    });
    return;
  }

  const avatarURL = gravatar.url(email);
  const verificationToken = v4();

  const hashPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
  await User.create({
    email,
    password: hashPassword,
    subscription,
    avatarURL,
    verificationToken,
  });

  const mail = {
    to: email,
    subject: "Подтверждение",
    html: `<a target="_blank" href='http://localhost:3000/api/users/verify/${verificationToken}'>Перейдите по ссылке для подтверждения электронного адреса</a>`,
  };

  await sendEmail(mail);

  res.status(201).json({
    status: "created",
    code: 201,
    message: `New user ${email}`,
    data: {
      user: {
        email,
        subscription,
        avatarURL,
        verificationToken,
      },
    },
  });
};

module.exports = register;
