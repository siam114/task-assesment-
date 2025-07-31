const mongoose = require("mongoose");

const TaskSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    description: { type: String, required: true },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "COLLABORATIVE", "DONE"],
      default: "PENDING",
    },
    endDate: { type: Date, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Task", TaskSchema);
