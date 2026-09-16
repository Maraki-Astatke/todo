const API_URL = 'http://localhost:5001/api/tasks';

// GET all tasks
export const getAllTasks = async () => {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error('Failed to fetch tasks');
    return response.json();
};

// POST create a task
export const createTask = async (title) => {
    const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title })
    });
    if (!response.ok) throw new Error('Failed to create task');
    return response.json();
};

// PUT update a task
export const updateTask = async (id, updates) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
    });
    if (!response.ok) throw new Error('Failed to update task');
    return response.json();
};

// DELETE a task
export const deleteTask = async (id) => {
    const response = await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    if (!response.ok) throw new Error('Failed to delete task');
    return response.json();
};