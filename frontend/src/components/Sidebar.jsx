import { useState } from 'react';
import { Link } from 'react-router-dom';

export const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            {/* Backdrop for mobile */}
            {isOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/50 z-20"
                    onClick={() => setIsOpen(false)}
                />
            )}

            {/* Mobile toggle button - only show when closed */}
            {!isOpen && (
                <button
                    onClick={() => setIsOpen(true)}
                    className="md:hidden fixed bottom-4 right-4 z-40 bg-indigo-600 text-white p-3 rounded-full shadow-lg hover:bg-indigo-700 transition"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            )}

            {/* Sidebar */}
            <aside
                className={`${isOpen ? 'translate-x-0' : '-translate-x-full'
                    } w-64 bg-gradient-to-b from-indigo-700 to-indigo-900 text-white min-h-screen fixed md:relative md:translate-x-0 transition-transform duration-300 z-30 shadow-xl`}
            >
                <div className="p-6 overflow-hidden">
                    <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                        Menu
                    </h2>

                    <nav className="space-y-3">
                        <Link
                            to="/dashboard"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-3m0 0l7-4 7 4M5 9v10a1 1 0 001 1h12a1 1 0 001-1V9m-9 11l4-4m0 0l4 4m-4-4v8" />
                            </svg>
                            <span className="font-medium">Dashboard</span>
                        </Link>

                        <Link
                            to="/profile"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-indigo-600 transition duration-200 group"
                        >
                            <svg className="w-5 h-5 group-hover:scale-110 transition" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span className="font-medium">Profile</span>
                        </Link>
                    </nav>
                </div>

                {/* Close button for mobile */}
                <button
                    onClick={() => setIsOpen(false)}
                    className="md:hidden absolute top-4 right-4 text-white hover:bg-indigo-600 p-2 rounded-lg transition"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </aside>
        </>
    );
};

export default Sidebar;