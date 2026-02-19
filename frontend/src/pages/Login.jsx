import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema } from '../utils/validators';
import { authAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export const Login = () => {
    const navigate = useNavigate();
    const { login } = useAuth();
    const [apiError, setApiError] = useState('');
    const [loading, setLoading] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
        setLoading(true);
        setApiError('');
        try {
            const response = await authAPI.login(data.email, data.password);
            const { token, _id, name, email } = response.data;
            login({ _id, name, email }, token);
            navigate('/dashboard');
        } catch (error) {
            setApiError(error.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-indigo-600 to-purple-600 p-8 text-center">
                        <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3">
                            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">PT</span>
                        </div>
                        <h1 className="text-3xl font-bold text-white">Welcome Back</h1>
                        <p className="text-indigo-100 mt-2">Login to your PrimeTrade account</p>
                    </div>

                    {/* Form */}
                    <div className="p-8">
                        {apiError && (
                            <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg">
                                <p className="text-red-700 font-medium text-sm">⚠️ {apiError}</p>
                            </div>
                        )}

                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Email Address</label>
                                <input
                                    {...register('email')}
                                    type="email"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="you@example.com"
                                />
                                {errors.email && (
                                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.email.message}</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-gray-700 font-semibold mb-2">Password</label>
                                <input
                                    {...register('password')}
                                    type="password"
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition"
                                    placeholder="••••••••"
                                />
                                {errors.password && (
                                    <p className="text-red-500 text-sm mt-1 font-medium">{errors.password.message}</p>
                                )}
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-bold py-3 rounded-lg hover:shadow-lg transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? '🔄 Logging in...' : '🔓 Login'}
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="flex-1 border-t border-gray-300"></div>
                            <span className="px-3 text-gray-500 text-sm">or</span>
                            <div className="flex-1 border-t border-gray-300"></div>
                        </div>

                        {/* Register Link */}
                        <p className="text-center text-gray-600">
                            Don't have an account?{' '}
                            <Link to="/register" className="text-indigo-600 font-semibold hover:text-purple-600 transition">
                                Create one
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
