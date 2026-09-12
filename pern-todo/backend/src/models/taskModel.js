// Hardcoded tasks for now
let tasks = [
    { id: 1, title: 'Learn PERN Stack', completed: false },
    { id: 2, title: 'Build a To-Do App', completed: false }
];

let nextId = 3;

// Get all tasks
const getAllTasks = () => tasks;

// Get task by ID   
const getTaskById = (id) => tasks.find(t => t.id === id);

const createTask = (task) => {
    const newTask = { id: nextId++, ...task };
    tasks.push(newTask);
    return newTask;
}

const updateTask = (id, updatedTask) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
    if (taskIndex === -1) {
        return null;
    }
    tasks[taskIndex] = { ...tasks[taskIndex], ...updatedTask };
    return tasks[taskIndex];
}

const deleteTask = (id, deleteTask) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(id));
    if (taskIndex === -1) {
        return null;
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    return deletedTask[0];
}

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};