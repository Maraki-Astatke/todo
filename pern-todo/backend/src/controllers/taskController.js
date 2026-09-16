import taskModel from '../models/taskModel.js';

// Get all tasks
const getAllTasks = async (req, res) => {
    try {
        const tasks = await taskModel.getAllTasks();
        res.status(200).json(tasks);
    } catch (error) {
        console.error('Error fetching tasks:', error);
        res.status(500).json({ error: error.message });
    }
};

// Get task by ID
const getTaskById = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const task = await taskModel.getTaskById(id);

        if (!task) {
            return res.status(404).json({ error: 'Task not found' });
        }

        res.status(200).json(task);
    } catch (error) {
        console.error('Error fetching task:', error);
        res.status(500).json({ error: error.message });
    }
};


// Create a new task
const createTask = async (req, res) => {
    try {
        const { title } = req.body;

        if (!title) {
            return res.status(400).json({ error: 'Title is required!' });
        }

        const createdTask = await taskModel.createTask(title);
        res.status(201).json(createdTask);
    } catch (error) {
        console.error('Error creating task:', error);
        res.status(500).json({ error: error.message });
    }
};

// Update a task
const updateTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const { title, completed } = req.body;

        const updatedTask = await taskModel.updateTask(id, { title, completed });

        if (!updatedTask) {
            return res.status(404).json({ error: `Task with ID ${id} not found` });
        }

        res.status(200).json(updatedTask);
    } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: error.message });
    }
};

// Delete a task
const deleteTask = async (req, res) => {
    try {
        const id = parseInt(req.params.id);

        const deletedTask = await taskModel.deleteTask(id);

        if (!deletedTask) {
            return res.status(404).json({ error: `Task with ID ${id} not found` });
        }

        res.status(200).json({ 
            message: `Task "${deletedTask.title}" deleted successfully!`,
            task: deletedTask 
        });
    } catch (error) {
        console.error('Error deleting task:', error);
        res.status(500).json({ error: error.message });
    }
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};