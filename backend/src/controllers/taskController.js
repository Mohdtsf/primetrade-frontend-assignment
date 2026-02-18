const Task = require("../models/Task");

exports.createTask = async (req, res, next) => {
  try {
    const task = await Task.create({
      title: req.body.title,
      description: req.body.description,
      user: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};

exports.getTasks = async (req, res, next) => {
  try {
    const tasks = await Task.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
};

exports.updateTask = async (req, res, next) => {
  try {
    const task = await Task.findOne({ _id: req.params.id, user: req.user._id });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    task.title = req.body.title || task.title;
    task.description = req.body.description || task.description;

    const updated = await task.save();
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

exports.deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted" });
  } catch (error) {
    next(error);
  }
};
