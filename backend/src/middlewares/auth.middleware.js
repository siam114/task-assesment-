const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const cookieHeader = req.headers.cookie;
  if (!cookieHeader) {
    res.cookie("access_token", "", { httpOnly: true, sameSite: "strict" });
    return res.status(401).json({ message: "No token provided" });
  }

  const cookies = cookieHeader.split(";").reduce((acc, cookie) => {
    const [key, value] = cookie.trim().split("=");
    acc[key] = value;
    return acc;
  }, {});

  const token = cookies["access_token"];
  if (!token) {
    res.cookie("access_token", "", { httpOnly: true, sameSite: "strict" });
    return res.status(401).json({ message: "No token provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.cookie("access_token", "", { httpOnly: true, sameSite: "strict" });
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = auth;
