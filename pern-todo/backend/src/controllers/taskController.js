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

const createTask = (req, res) => {
    const newTask = req.body;
    const createdTask = taskModel.createTask(newTask);
    res.status(201).json(createdTask);
}

const updateTask = (req,res) =>{
    const { id } = req.params;
    const updatedTask = req.body;
    const task = taskModel.updateTask(id, updatedTask);
    res.json(task);
}

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};







