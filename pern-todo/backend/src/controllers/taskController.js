import taskModel from '../models/taskModel.js';

// Get all tasks
const getAllTasks = (req, res) => {
    const tasks = taskModel.getAllTasks();
    res.json(tasks);
};

const getTaskById = (req, res) => {
    const id = parseInt(req.params.id);
    const task = taskModel.getTaskById(id);

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(task);
};


// Create a new task
const createTask = (req, res) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: 'Title is required' });
    }

    const newTask = taskModel.createTask(title);
    res.status(201).json(newTask);
};

// Update a task
const updateTask = (req, res) => {
    const id = parseInt(req.params.id);
    const { title, completed } = req.body;

    const updatedTask = taskModel.updateTask(id, { title, completed });

    if (!updatedTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json(updatedTask);
};

// Delete a task
const deleteTask = (req, res) => {
    const id = parseInt(req.params.id);

    const deletedTask = taskModel.deleteTask(id);

    if (!deletedTask) {
        return res.status(404).json({ error: 'Task not found' });
    }

    res.json({ message: 'Task deleted successfully' });
};


export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};