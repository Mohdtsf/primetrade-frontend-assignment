import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import { taskAPI } from '../services/api';

export const Dashboard = () => {
    const { user } = useAuth();
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(false);
    const [editingTask, setEditingTask] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');

    // ✅ Custom Dropdown State
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);

    const statusOptions = [
        { value: 'all', label: 'All Status' },
        { value: 'pending', label: 'Pending' },
        { value: 'completed', label: 'Completed' },
    ];

    useEffect(() => {
        fetchTasks();
    }, []);

    // ✅ Close dropdown on outside click
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsDropdownOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const response = await taskAPI.getTasks();
            setTasks(response.data);
        } catch (error) {
            console.error('Failed to fetch tasks:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleCreateOrUpdateTask = async (data) => {
        try {
            setLoading(true);
            if (editingTask) {
                const response = await taskAPI.updateTask(editingTask._id, {
                    title: data.title,
                    description: data.description,
                });
                setTasks(tasks.map((t) => (t._id === editingTask._id ? response.data : t)));
                setEditingTask(null);
            } else {
                const response = await taskAPI.createTask(data.title, data.description);
                setTasks([response.data, ...tasks]);
            }
        } catch (error) {
            console.error('Failed to save task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleToggleComplete = async (id) => {
        try {
            setLoading(true);
            const task = tasks.find((t) => t._id === id);
            const response = await taskAPI.updateTask(id, { completed: !task.completed });
            setTasks(tasks.map((t) => (t._id === id ? response.data : t)));
        } catch (error) {
            console.error('Failed to toggle task:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleEditTask = (task) => {
        setEditingTask(task);
    };

    const handleCancelEdit = () => {
        setEditingTask(null);
    };

    const handleDeleteTask = async (id) => {
        try {
            setLoading(true);
            await taskAPI.deleteTask(id);
            setTasks(tasks.filter((t) => t._id !== id));
        } catch (error) {
            console.error('Failed to delete task:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredTasks = tasks.filter((task) => {
        const matchesSearch =
            task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (task.description &&
                task.description.toLowerCase().includes(searchQuery.toLowerCase()));

        let matchesStatus = true;
        if (filterStatus === 'pending') {
            matchesStatus = !task.completed;
        } else if (filterStatus === 'completed') {
            matchesStatus = task.completed;
        }

        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="flex">
                <Sidebar />

                <div className="flex-1 p-4 md:p-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
                            👋 Welcome, {user?.name}!
                        </h1>
                        <p className="text-gray-600">
                            Manage your tasks and stay productive
                        </p>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 mb-8">
                        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-600">
                            <p className="text-gray-600">Total Tasks</p>
                            <p className="text-3xl font-bold text-indigo-600">
                                {tasks.length}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-6 md:space-y-8">
                        <TaskForm
                            onSubmit={handleCreateOrUpdateTask}
                            loading={loading}
                            editingTask={editingTask}
                            onCancel={handleCancelEdit}
                        />

                        <div className="bg-white rounded-xl shadow-md border border-gray-100 p-5 md:p-6">
                            {/* Top Section */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                                <h2 className="text-xl md:text-2xl font-bold text-gray-800">
                                    My Tasks
                                </h2>

                                <p className="text-sm text-gray-500">
                                    {filteredTasks.length}{' '}
                                    {filteredTasks.length === 1
                                        ? 'task'
                                        : 'tasks'}{' '}
                                    found
                                </p>
                            </div>

                            {/* Search + Filter */}
                            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 mb-6">
                                {/* Search */}
                                <div className="relative flex-1 min-w-0">
                                    <input
                                        type="text"
                                        placeholder="Search tasks..."
                                        value={searchQuery}
                                        onChange={(e) =>
                                            setSearchQuery(e.target.value)
                                        }
                                        className="w-full pl-4 pr-10 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm"
                                    />
                                </div>

                                {/* ✅ Custom Dropdown */}
                                <div
                                    ref={dropdownRef}
                                    className="relative min-w-[140px] sm:min-w-[160px]"
                                >
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setIsDropdownOpen(!isDropdownOpen)
                                        }
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-white shadow-sm text-left flex justify-between items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                                    >
                                        {
                                            statusOptions.find(
                                                (opt) =>
                                                    opt.value === filterStatus
                                            )?.label
                                        }

                                        <svg
                                            className={`w-4 h-4 transition-transform ${isDropdownOpen
                                                ? 'rotate-180'
                                                : ''
                                                }`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M19 9l-7 7-7-7"
                                            />
                                        </svg>
                                    </button>

                                    {isDropdownOpen && (
                                        <div className="absolute top-full left-0 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                                            {statusOptions.map((option) => (
                                                <div
                                                    key={option.value}
                                                    onClick={() => {
                                                        setFilterStatus(
                                                            option.value
                                                        );
                                                        setIsDropdownOpen(
                                                            false
                                                        );
                                                    }}
                                                    className={`px-4 py-2 cursor-pointer hover:bg-indigo-50 ${filterStatus ===
                                                        option.value
                                                        ? 'bg-indigo-100 font-medium'
                                                        : ''
                                                        }`}
                                                >
                                                    {option.label}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>

                            <TaskList
                                tasks={filteredTasks}
                                onEdit={handleEditTask}
                                onDelete={handleDeleteTask}
                                onToggle={handleToggleComplete}
                                loading={loading}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
