const mongoose = require("../config/db.config");
const bcrypt = require("bcrypt");
const generateToken = require("../utils/generateToken");
const User = require("../models/user.model");

exports.registerUser = async (email, name, password) => {
  // const existingUser = await prisma.user.findUnique({ where: { email } });
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email already exists");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  // const newUser = await prisma.user.create({
  //   data: { email, password: hashedPassword },
  // });
  const newUser = new User({
    email,
    name,
    password: hashedPassword,
  });
  await newUser.save();
  const token = generateToken(newUser.id);
  return { ...newUser, token };
};

exports.loginUser = async (email, password) => {
  // const user = await prisma.user.findUnique({ where: { email } });
  const user = await User.findOne({ email });
  if (!user) throw new Error("Invalid credentials");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid credentials");
  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
  const token = generateToken(userData);
  return { ...userData, token };
};
