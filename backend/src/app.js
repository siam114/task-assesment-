const express = require("express");
const authRoutes = require("./routes/auth.route");
const userRoutes = require("./routes/user.route");
const tasksRoutes = require("./routes/task.route");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");
const errorHandler = require("./middlewares/error.middleware");
const app = express();
app.use(express.json());

app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3001",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(errorHandler);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/tasks", tasksRoutes);

// 404 fallback
app.use((req, res) => {
  res.status(404).json({ message: "Not Found" });
});

module.exports = app;
