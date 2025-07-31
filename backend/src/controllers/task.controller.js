const taskService = require("../services/task.service");

exports.createTask = async (req, res) => {
  try {
    const task = await taskService.createTask({
      ...req.body,
      userId: req.user.id,
    });
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error creating task", error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.user.id,
      req.body
    );
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error updating task", error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const task = await taskService.deleteTask(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json({ msg: "Task deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Error deleting task", error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await taskService.getTasks(req.user.id, req.query);
    res.json({ tasks });
  } catch (err) {
    res.status(500).json({ msg: "Error fetching tasks", error: err.message });
  }
};

exports.getTaskById = async (req, res) => {
  try {
    const task = await taskService.getTaskById(req.params.id, req.user.id);
    if (!task) return res.status(404).json({ msg: "Task not found" });
    res.json(task);
  } catch (err) {
    res.status(500).json({ msg: "Error fetching task", error: err.message });
  }
};
