// Import the database connection
import pool from '../config/database.js';

// ============ MODEL FUNCTIONS ============

// 1. Get all tasks from the database
const getAllTasks = async () => {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    return result.rows;
};

// 2. Create a new task in the database
const createTask = async (title) => {
    const result = await pool.query(
        'INSERT INTO tasks (title, completed) VALUES ($1, $2) RETURNING *',
        [title, false]
    );
    return result.rows[0];
};

// 3. Update a task in the database
const updateTask = async (id, updates) => {
    // First, get the current task
    const currentResult = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    
    if (currentResult.rows.length === 0) {
        return null; // Task not found
    }
    
    const currentTask = currentResult.rows[0];
    
    // Use existing values if not provided in updates
    const newTitle = updates.title !== undefined ? updates.title : currentTask.title;
    const newCompleted = updates.completed !== undefined ? updates.completed : currentTask.completed;
    
    // Update the task
    const result = await pool.query(
        'UPDATE tasks SET title = $1, completed = $2 WHERE id = $3 RETURNING *',
        [newTitle, newCompleted, id]
    );
    
    return result.rows[0];
};

// 4. Delete a task from the database
const deleteTask = async (id) => {
    const result = await pool.query(
        'DELETE FROM tasks WHERE id = $1 RETURNING *',
        [id]
    );
    
    if (result.rows.length === 0) {
        return null; // Task not found
    }
    
    return result.rows[0];
};

// ============ EXPORT ALL FUNCTIONS ============
export default {
    getAllTasks,
    createTask,
    updateTask,
    deleteTask
};