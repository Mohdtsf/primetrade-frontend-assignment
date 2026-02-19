import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { taskSchema } from '../utils/validators';

export const TaskForm = ({ onSubmit, loading, editingTask, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(taskSchema),
        defaultValues: editingTask || { title: '', description: '' },
    });

    useEffect(() => {
        if (editingTask) {
            reset({ title: editingTask.title, description: editingTask.description });
        } else {
            reset({ title: '', description: '' });
        }
    }, [editingTask, reset]);

    const onFormSubmit = async (data) => {
        await onSubmit(data);
        reset();
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)} className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 md:p-8 mb-8">
            <h2 className={`text-2xl font-bold mb-6 ${editingTask ? 'text-yellow-600' : 'text-indigo-600'}`}>
                {editingTask ? '✏️ Edit Task' : '➕ Create New Task'}
            </h2>

            <div className="space-y-6">
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Task Title</label>
                    <input
                        {...register('title')}
                        type="text"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                        placeholder="Enter task title"
                    />
                    {errors.title && (
                        <p className="text-red-500 text-sm mt-1 font-medium">{errors.title.message}</p>
                    )}
                </div>

                <div>
                    <label className="block text-gray-700 font-semibold mb-2">Description</label>
                    <textarea
                        {...register('description')}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition resize-none"
                        placeholder="Enter task description (optional)"
                        rows="4"
                    />
                    {errors.description && (
                        <p className="text-red-500 text-sm mt-1 font-medium">{errors.description.message}</p>
                    )}
                </div>
            </div>

            <div className="flex gap-3 mt-8">
                <button
                    type="submit"
                    disabled={loading}
                    className={`flex-1 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 ${editingTask
                        ? 'bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-400'
                        : 'bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400'
                        }`}
                >
                    {loading ? (editingTask ? 'Updating...' : 'Adding...') : (editingTask ? 'Update Task' : 'Add Task')}
                </button>
                {editingTask && (
                    <button
                        type="button"
                        onClick={onCancel}
                        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-3 px-6 rounded-lg transition duration-200"
                    >
                        Cancel
                    </button>
                )}
            </div>
        </form>
    );
};

export default TaskForm;