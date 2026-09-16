import { useState, useEffect } from 'react';
import TaskForm from './componenet/TaskForm';
import TaskList from './componenet/TaskList';
import * as api from "./service/api.js";
function App() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTasks();
    }, []);

    const loadTasks = async () => {
        try {
            setLoading(true);
            const data = await api.getAllTasks();
            setTasks(data);
            setError(null);
        } catch (err) {
            setError('Failed to load tasks. Is the backend running?');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    const handleAdd = async (title) => {
        try {
            const newTask = await api.createTask(title);
            setTasks([...tasks, newTask]);
            setError(null);
        } catch (err) {
            setError('Failed to add task');
            console.error(err);
        }
    };

    const handleToggle = async (id, currentCompleted) => {
        try {
            const updated = await api.updateTask(id, { completed: !currentCompleted });
            setTasks(tasks.map(t => t.id === id ? updated : t));
            setError(null);
        } catch (err) {
            setError('Failed to update task');
            console.error(err);
        }
    };

    const handleEdit = async (id, newTitle) => {
        try {
            const updated = await api.updateTask(id, { title: newTitle });
            setTasks(tasks.map(t => t.id === id ? updated : t));
            setError(null);
        } catch (err) {
            setError('Failed to edit task');
            console.error(err);
        }
    };

    const handleDelete = async (id) => {
        try {
            await api.deleteTask(id);
            setTasks(tasks.filter(t => t.id !== id));
            setError(null);
        } catch (err) {
            setError('Failed to delete task');
            console.error(err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
            <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-center text-gray-800 mb-2">
                    📝 My To-Do List
                </h1>
                <p className="text-center text-gray-500 mb-8">
                    Stay organized, one task at a time
                </p>

                {error && (
                    <div className="bg-red-100 border-l-4 border-red-500 text-red-700 
                                    px-4 py-3 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                <div className="bg-white rounded-2xl shadow-xl p-6">
                    <TaskForm onAdd={handleAdd} />

                    {loading ? (
                        <p className="text-center text-gray-400 py-12">
                            Loading tasks...
                        </p>
                    ) : (
                        <TaskList
                            tasks={tasks}
                            onToggle={handleToggle}
                            onDelete={handleDelete}
                            onEdit={handleEdit}
                        />
                    )}
                </div>

                <p className="text-center text-gray-400 mt-6 text-sm">
                    {tasks.length} {tasks.length === 1 ? 'task' : 'tasks'} total
                </p>
            </div>
        </div>
    );
}

export default App;