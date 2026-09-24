import { useState } from 'react';

function TaskItem({ task, onToggle, onDelete, onEdit }) {
    const [isEditing, setIsEditing] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);

    const handleSave = () => {
        if (editTitle.trim() && editTitle !== task.title) {
            onEdit(task.id, editTitle);
        }
        setIsEditing(false);
    };

    const handleCancel = () => {
        setEditTitle(task.title);
        setIsEditing(false);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSave();
        if (e.key === 'Escape') handleCancel();
    };

    return (
        <div className="flex items-center gap-3 p-4 bg-white rounded-lg mb-2 
                        shadow-sm hover:shadow-md transition-shadow duration-200">
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggle(task.id, task.completed)}
                className="w-15 h-5 cursor-pointer accent-blue-600"
            />

            {isEditing ? (
                <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    className="flex-1 px-2 py-1 border border-blue-400 rounded 
                               focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            ) : (
                <span
                    className={`flex-1 text-base transition-all duration-200 ${task.completed
                        ? 'line-through text-gray-400'
                        : 'text-gray-800'
                        }`}
                >
                    {task.title}
                </span>
            )}

            {isEditing ? (
                <>
                    <button
                        onClick={handleSave}
                        className="w-8 h-8 flex items-center justify-center 
                                   bg-green-500 text-white rounded-md 
                                   hover:bg-green-600 transition-colors text-sm font-bold"
                        aria-label="Save"
                    >
                        ✓
                    </button>
                    <button
                        onClick={handleCancel}
                        className="w-8 h-8 flex items-center justify-center 
                                   bg-gray-400 text-white rounded-md 
                                   hover:bg-gray-600 transition-colors text-sm font-bold"
                        aria-label="Cancel"
                    >
                        ✕
                    </button>
                </>
            ) : (
                <>
                    <button
                        onClick={() => setIsEditing(true)}
                        className="w-8 h-8 flex items-center justify-center 
                                   bg-yellow-500 text-white rounded-md 
                                   hover:bg-yellow-600 transition-colors text-sm"
                        aria-label="Edit"
                    >
                        ✏️
                    </button>
                    <button
                        onClick={() => onDelete(task.id)}
                        className="w-8 h-8 flex items-center justify-center 
                                   bg-red-500 text-white rounded-md 
                                   hover:bg-red-600 transition-colors text-sm font-bold"
                        aria-label="Delete"
                    >
                        X
                    </button>
                </>
            )}
        </div>
    );
}

export default TaskItem;