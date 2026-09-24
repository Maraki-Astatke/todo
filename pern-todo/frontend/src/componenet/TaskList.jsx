import TaskItem from './TaskItem.jsx';

function TaskList({ tasks, onToggle, onDelete, onEdit }) {
    if (tasks.length === 0) {
        return (
            <p className="text-center font-3 text-gray-400 py-12 text-base">
                No tasks yet. Add one above! ☝️
            </p>
        );
    }

    return (
        <div className="space-y-1">
            {tasks.map((task) => (
                <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={onToggle}
                    onDelete={onDelete}
                    onEdit={onEdit}
                />
            ))}
        </div>
    );
}

export default TaskList;