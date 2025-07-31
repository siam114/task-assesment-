const userService = require("../services/user.service");
const validateEmail = require("../utils/email.validator");

exports.getUser = async (req, res) => {
  try {
    const { token, ...userData } = await userService.getUser(req.user.id);
    res.status(200).json({
      ...userData,
    });
  } catch (err) {
    res.status(401).json({ message: err.message });
  }
};
