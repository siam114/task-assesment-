const User = require("../models/user.model");

exports.getUser = async (userId) => {
  const user = await User.findById(userId).select('-password');
  if (!user) throw new Error("Invalid credentials");

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
  return { ...userData };
};