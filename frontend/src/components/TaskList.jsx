export const TaskList = ({ tasks, onDelete, onEdit, loading }) => {
    if (tasks.length === 0) {
        return (
            <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-12 text-center">
                <svg className="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="text-gray-600 text-lg font-medium">No tasks yet</p>
                <p className="text-gray-500 text-sm">Create one to get started!</p>
            </div>
        );
    }

    return (
        <div className="grid gap-4 md:gap-6">
            {tasks.map((task) => (
                <div
                    key={task._id}
                    className="bg-white rounded-xl shadow-md hover:shadow-lg border border-gray-100 p-5 md:p-6 transition duration-300 transform hover:scale-[1.01]"
                >
                    <div className="flex justify-between items-start gap-4">
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-3 mb-2">
                                <h3 className={`text-lg md:text-xl font-bold break-words ${task.completed ? 'line-through text-gray-400' : 'text-gray-800'}`}>
                                    {task.title}
                                </h3>

                            </div>
                            {task.description && (
                                <p className={`text-sm md:text-base break-words ${task.completed ? 'text-gray-400 line-through' : 'text-gray-600'}`}>
                                    {task.description}
                                </p>
                            )}
                        </div>

                        <div className="flex gap-2 flex-shrink-0">
                            <button
                                onClick={() => onEdit(task)}
                                disabled={loading}
                                className="flex items-center justify-center w-10 h-10 md:w-auto md:px-3 md:py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                title="Edit task"
                            >
                                <span className="hidden md:inline">Edit</span>
                                <span className="md:hidden">✏️</span>
                            </button>
                            <button
                                onClick={() => onDelete(task._id)}
                                disabled={loading}
                                className="flex items-center justify-center w-10 h-10 md:w-auto md:px-3 md:py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition duration-200"
                                title="Delete task"
                            >
                                <span className="hidden md:inline">Delete</span>
                                <span className="md:hidden">🗑️</span>
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default TaskList;
