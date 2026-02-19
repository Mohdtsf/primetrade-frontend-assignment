import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { profileSchema } from '../utils/validators';
import { useAuth } from '../context/AuthContext';
import { userAPI } from '../services/api';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

export const Profile = () => {
    const { user, login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const [profileData, setProfileData] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm({
        resolver: zodResolver(profileSchema),
        defaultValues: { name: '', email: '', password: '' },
    });

    // Fetch profile data on component mount
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const response = await userAPI.getProfile();
                setProfileData(response.data);
                reset({
                    name: response.data.name,
                    email: response.data.email,
                    password: '',
                });
            } catch (error) {
                console.error('Failed to fetch profile:', error);
                setMessage('Failed to load profile data');
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchProfile();
        }
    }, [user, reset]);

    const onSubmit = async (data) => {
        try {
            setLoading(true);
            setMessage('');
            const response = await userAPI.updateProfile(
                data.name,
                data.email,
                data.password || undefined
            );
            const { _id, name, email } = response.data;
            login({ _id, name, email }, localStorage.getItem('token'));
            setProfileData(response.data);
            reset({
                name: response.data.name,
                email: response.data.email,
                password: '',
            });
            setMessage('Profile updated successfully!');
        } catch (error) {
            setMessage(
                error.response?.data?.message || 'Failed to update profile'
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Fixed Navbar */}
            <Navbar />

            <div className="flex">
                {/* Sidebar */}
                <Sidebar />

                {/* Main Content */}
                <div className="flex-1 p-4 md:p-8">
                    <div className="max-w-2xl mx-auto">
                        {/* Header */}
                        <div className="mb-8">
                            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">👤 Profile Settings</h1>
                            <p className="text-gray-600">Manage your account information</p>
                        </div>

                        {/* Card */}
                        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                            {/* Status Message */}
                            {message && (
                                <div
                                    className={`p-4 md:p-6 border-l-4 ${message.includes('successfully')
                                        ? 'bg-green-50 border-green-500'
                                        : 'bg-red-50 border-red-500'
                                        }`}
                                >
                                    <p
                                        className={`font-medium ${message.includes('successfully')
                                            ? 'text-green-700'
                                            : 'text-red-700'
                                            }`}
                                    >
                                        {message.includes('successfully') ? '✓' : '✕'} {message}
                                    </p>
                                </div>
                            )}

                            {/* Form */}
                            <form onSubmit={handleSubmit(onSubmit)} className="p-6 md:p-8 space-y-6">
                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">Full Name</label>
                                    <input
                                        {...register('name')}
                                        type="text"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    />
                                    {errors.name && (
                                        <p className="text-red-500 text-sm mt-2 font-medium">⚠️ {errors.name.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">Email Address</label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            value={profileData?.email || ''}
                                            readOnly
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed text-gray-600"
                                        />
                                        <span className="absolute right-3 top-3 text-gray-400">🔒</span>
                                    </div>
                                    <p className="text-gray-500 text-xs mt-2">Email cannot be changed for security reasons</p>
                                </div>

                                <div>
                                    <label className="block text-gray-700 font-semibold mb-3">New Password (Optional)</label>
                                    <input
                                        {...register('password')}
                                        type="password"
                                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                        placeholder="Leave blank to keep current password"
                                    />
                                    {errors.password && (
                                        <p className="text-red-500 text-sm mt-2 font-medium">⚠️ {errors.password.message}</p>
                                    )}
                                    <p className="text-gray-500 text-xs mt-2">Password must be at least 6 characters</p>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed mt-8"
                                >
                                    {loading ? '⏳ Updating profile...' : '💾 Save Changes'}
                                </button>
                            </form>
                        </div>

                        {/* Info Card */}
                        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <p className="text-blue-900 font-medium">💡 Tip:</p>
                            <p className="text-blue-800 text-sm mt-2">
                                Keep your password strong and unique. We recommend changing it regularly for better security.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;