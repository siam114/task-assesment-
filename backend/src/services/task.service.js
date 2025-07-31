const Task = require("../models/task.model");

exports.createTask = async (data) => {
  const res = await Task.create(data);
  return {
    id: res.id,
    status: res.status,
    description: res.description,
    category: res.category,
    endDate: res.endDate,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};

exports.updateTask = async (taskId, userId, data) => {
  const res = await Task.findOneAndUpdate({ _id: taskId, userId }, data, {
    new: true,
  });

  return {
    id: res.id,
    status: res.status,
    description: res.description,
    category: res.category,
    endDate: res.endDate,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};

exports.deleteTask = async (taskId, userId) => {
  const res = await Task.findOneAndDelete({ _id: taskId, userId });
  return {
    id: res.id,
    description: res.description,
    status: res.status,
    category: res.category,
    endDate: res.endDate,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};

exports.getTasks = async (userId, query) => {
  const filter = { userId };

  if (query.status) filter.status = query.status;
  if (query.category) filter.category = query.category;

  if (query.startDate || query.endDate) {
    filter.endDate = {};
    if (query.startDate) filter.endDate.$gte = new Date(query.startDate);
    if (query.endDate) filter.endDate.$lte = new Date(query.endDate);
  }

  const data = await Task.find(filter).sort({ createdAt: -1 });
  return data.map((item) => {
    return {
      id: item.id,
      description: item.description,
      status: item.status,
      category: item.category,
      endDate: item.endDate,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    };
  });
};

exports.getTaskById = async (taskId, userId) => {
  const res = await Task.findOne({ _id: taskId, userId });
  if (!res) return null;
  return {
    id: res.id,
    description: res.description,
    status: res.status,
    category: res.category,
    endDate: res.endDate,
    createdAt: res.createdAt,
    updatedAt: res.updatedAt,
  };
};
