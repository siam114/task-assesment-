const authService = require("../services/auth.service");
const validateEmail = require("../utils/email.validator");

exports.register = async (req, res) => {
  const { email, password, name } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  if (!name) {
    return res.status(400).json({ message: "Invalid name provided" });
  }

  if (!password || password.length < 6) {
    return res
      .status(400)
      .json({ message: "Password must be at least 6 characters long" });
  }

  try {
    const { token, ...userData } = await authService.registerUser(
      email,
      name,
      password
    );
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(201).json({
      ...userData,
    });
    // res.status(201).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  if (!validateEmail(email)) {
    return res.status(400).json({ message: "Invalid email format" });
  }

  try {
    const { token, ...userData } = await authService.loginUser(email, password);
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    res.status(200).json({
      ...userData,
    });
    // res.status(200).json({ token });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
