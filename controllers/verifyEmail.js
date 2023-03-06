const { User } = require("../models/user");

const verifyEmail = async (req, res) => {
  const { verificationToken } = req.params;
  const user = await User.findOne({ verificationToken });
  if (!user) {
    res.status(404).json({
      status: "Not Found",
      code: 404,
      message: "User not found",
    });
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: null,
  });

  res.status(200).json({
    status: "Ok",
    code: 200,
    message: "Verification successful",
  });
};

module.exports = verifyEmail;
