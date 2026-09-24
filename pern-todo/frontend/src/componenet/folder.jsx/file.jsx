// App.jsx
import { useState } from 'react';
import TaskItem from './TaskItem';

function App() {
    const [tasks, setTasks] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [filter, setFilter] = useState('all'); // 'all' | 'active' | 'completed'

    // ---------- CRUD operations ----------
    const addTask = () => {
        const trimmed = inputValue.trim();
        if (!trimmed) return;

        const newTask = {
            id: Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
            title: trimmed,
            completed: false,
        };

        setTasks((prev) => [...prev, newTask]);
        setInputValue('');
    };

    const toggleTask = (id, completed) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, completed: !completed } : task
            )
        );
    };

    const deleteTask = (id) => {
        setTasks((prev) => prev.filter((task) => task.id !== id));
    };

    const editTask = (id, newTitle) => {
        setTasks((prev) =>
            prev.map((task) =>
                task.id === id ? { ...task, title: newTitle } : task
            )
        );
    };

    const clearCompleted = () => {
        setTasks((prev) => prev.filter((task) => !task.completed));
    };

    // ---------- derived data ----------
    const filteredTasks = tasks.filter((task) => {
        if (filter === 'active') return !task.completed;
        if (filter === 'completed') return task.completed;
        return true;
    });

    const activeCount = tasks.filter((t) => !t.completed).length;
    const completedCount = tasks.length - activeCount;

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') addTask();
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 
                    flex items-center justify-center p-4">
            <div className="w-full max-w-xl bg-white/70 backdrop-blur-sm 
                      rounded-3xl shadow-xl border border-white/60 p-6 sm:p-8">
                {/* Header */}
                <h1 className="text-3xl font-semibold text-slate-800 mb-6 flex items-center gap-3">
                    Todo List
                    <span className="text-sm font-medium bg-slate-800 text-white 
                           px-3 py-1 rounded-full">
                        {tasks.length}
                    </span>
                </h1>

                {/* Input area */}
                <div className="flex gap-2 mb-6">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="What needs to be done?"
                        className="flex-1 px-4 py-3 border border-slate-300 rounded-full 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       focus:border-transparent bg-white text-slate-800"
                    />
                    <button
                        onClick={addTask}
                        className="px-6 py-3 bg-blue-600 text-white font-medium rounded-full 
                       hover:bg-blue-700 active:scale-95 transition-all 
                       shadow-md shadow-blue-600/20"
                    >
                        + Add
                    </button>
                </div>

                {/* Filter bar */}
                <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200">
                    {['all', 'active', 'completed'].map((f) => (
                        <button
                            key={f}
                            onClick={() => setFilter(f)}
                            className={`px-4 py-1.5 rounded-full text-sm font-medium 
                          transition-colors capitalize ${filter === f
                                    ? 'bg-slate-800 text-white shadow-sm'
                                    : 'text-slate-500 hover:bg-slate-100 hover:text-slate-800'
                                }`}
                        >
                            {f}
                        </button>
                    ))}
                    <span className="ml-auto text-xs text-slate-500 font-medium 
                           bg-slate-100 px-3 py-1 rounded-full whitespace-nowrap">
                        {activeCount} active · {completedCount} done
                    </span>
                </div>

                {/* Task list */}
                <div className="max-h-96 overflow-y-auto pr-1">
                    {filteredTasks.length === 0 ? (
                        <div className="text-center py-12 text-slate-400 
                            border-2 border-dashed border-slate-200 rounded-xl">
                            {filter === 'all' && '✨ Nothing here yet — add a task'}
                            {filter === 'active' && '🎉 All tasks completed!'}
                            {filter === 'completed' && '📭 No completed tasks yet'}
                        </div>
                    ) : (
                        filteredTasks.map((task) => (
                            <TaskItem
                                key={task.id}
                                task={task}
                                onToggle={toggleTask}
                                onDelete={deleteTask}
                                onEdit={editTask}
                            />
                        ))
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between mt-6 pt-4 
                        border-t border-slate-200 text-sm text-slate-500">
                    <span>Double-click checkbox? No — click ✏️ to edit</span>
                    <button
                        onClick={clearCompleted}
                        disabled={completedCount === 0}
                        className="px-4 py-2 border border-slate-300 rounded-full 
                       font-medium hover:bg-slate-50 hover:border-slate-400 
                       transition-colors disabled:opacity-40 
                       disabled:pointer-events-none text-slate-600"
                    >
                        Clear Completed
                    </button>
                </div>
            </div>
        </div>
    );
}

export default App;