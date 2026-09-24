// models/taskModel.js
import fs from 'fs/promises';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data', 'tasks.json');

// ---------- helpers ----------
const readTasks = async () => {
    try {
        const data = await fs.readFile(DATA_FILE, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        // if file doesn't exist yet, start with empty array
        if (error.code === 'ENOENT') return [];
        throw error;
    }
};

const writeTasks = async (tasks) => {
    await fs.mkdir(path.dirname(DATA_FILE), { recursive: true });
    await fs.writeFile(DATA_FILE, JSON.stringify(tasks, null, 2), 'utf-8');
};

// ---------- CRUD operations ----------
const getAllTasks = async () => {
    return await readTasks();
};

const getTaskById = async (id) => {
    const tasks = await readTasks();
    return tasks.find((task) => task.id === id) || null;
};

const createTask = async (title) => {
    const tasks = await readTasks();

    // generate next numeric id
    const nextId = tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;

    const newTask = {
        id: nextId,
        title: title.trim(),
        completed: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    };

    tasks.push(newTask);
    await writeTasks(tasks);
    return newTask;
};

const updateTask = async (id, updates) => {
    const tasks = await readTasks();
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) return null;

    const { title, completed } = updates;

    // only update fields that were provided
    if (title !== undefined) tasks[index].title = title.trim();
    if (completed !== undefined) tasks[index].completed = completed;

    tasks[index].updatedAt = new Date().toISOString();

    await writeTasks(tasks);
    return tasks[index];
};

const deleteTask = async (id) => {
    const tasks = await readTasks();
    const index = tasks.findIndex((task) => task.id === id);

    if (index === -1) return null;

    const [deleted] = tasks.splice(index, 1);
    await writeTasks(tasks);
    return deleted;
};

// ---------- extra helpers (bonus) ----------
const toggleTask = async (id) => {
    const tasks = await readTasks();
    const task = tasks.find((t) => t.id === id);
    if (!task) return null;

    task.completed = !task.completed;
    task.updatedAt = new Date().toISOString();

    await writeTasks(tasks);
    return task;
};

const getTasksByStatus = async (completed) => {
    const tasks = await readTasks();
    return tasks.filter((task) => task.completed === completed);
};

export default {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    toggleTask,
    getTasksByStatus,
};