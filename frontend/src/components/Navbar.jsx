import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';

export const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="overflow-hidden bg-gradient-to-r from-indigo-600 to-purple-600 shadow-lg sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                            <span className="text-indigo-600 font-bold text-lg">PT</span>
                        </div>
                        <span className="text-white font-bold text-xl hidden sm:inline">PrimeTrade</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {user && (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition duration-200 font-medium"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link to="/login" className="text-white hover:bg-indigo-500 px-4 py-2 rounded-lg transition duration-200">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="bg-white text-indigo-600 hover:bg-gray-100 px-4 py-2 rounded-lg transition duration-200 font-medium"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Mobile menu button */}
                    <div className="md:hidden">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-white p-2 rounded-lg hover:bg-indigo-500 transition"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden pb-4 border-t border-indigo-500">
                        {user && (
                            <>
                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition mt-2"
                                >
                                    Logout
                                </button>
                            </>
                        )}
                        {!user && (
                            <>
                                <Link to="/login" className="block text-white hover:bg-indigo-500 px-4 py-2 rounded-lg transition">
                                    Login
                                </Link>
                                <Link
                                    to="/register"
                                    className="block bg-white text-indigo-600 px-4 py-2 rounded-lg transition mt-2"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;