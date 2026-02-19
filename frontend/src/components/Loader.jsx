export const Loader = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
            <div className="flex flex-col items-center gap-4">
                <div className="relative w-16 h-16">
                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full animate-spin"
                        style={{ clipPath: 'polygon(50% 0%, 100% 38%, 82% 100%, 18% 100%, 0% 38%)' }} />
                    <div className="absolute inset-1 bg-white rounded-full" />
                </div>
                <p className="text-gray-600 font-medium">Loading...</p>
            </div>
        </div>
    );
};

export default Loader;