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




export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};