const Task = require('../models/Task');

exports.getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({ userId: req.user.id });
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

exports.addTask = async (req, res) => {
    try {
        const task = new Task({ ...req.body, userId: req.user.id });
        const saved = await task.save();
        res.status(201).json(saved);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

exports.updateTask = async (req, res) => {
    try {
        const task = await Task.findOneAndUpdate(
            { _id: req.params.id, userId: req.user.id },
            req.body,
            { new: true }
        );
        res.json(task);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};


exports.deleteTask = async (req, res) => {
    try {
        await Task.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
        res.json({ message: 'Task deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};