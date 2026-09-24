import { useState } from 'react';

function TaskForm({ onAdd }) {
    const [title, setTitle] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim()) return;

        onAdd(title);
        setTitle('');
    };

    return (
        <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-1 px-4 py-3 text-base border border-gray-300 rounded-lg 
                           focus:outline-none focus:ring-2 focus:ring-blue-500 
                           focus:border-transparent"
            />
            <button
                type="submit"
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg 
                           hover:bg-blue-700 active:bg-blue-800 
                           transition-colors duration-200 
                           disabled:opacity-50"
            >
                Add +
            </button>
        </form>
    );
}

export default TaskForm;