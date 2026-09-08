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


// Create a new task
const createTask = (title) => {
    const newTask = { id: nextId++, title, completed: false };
    tasks.push(newTask);
    return newTask;
};

// Update a task
const updateTask = (id, updates) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    if (updates.title !== undefined) tasks[index].title = updates.title;
    if (updates.completed !== undefined) tasks[index].completed = updates.completed;

    return tasks[index];
};

// Delete a task
const deleteTask = (id) => {
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) return null;

    const deleted = tasks[index];
    tasks.splice(index, 1);
    return deleted;
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask
};