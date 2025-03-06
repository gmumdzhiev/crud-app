
export const LoadingModal = () => {
    return (
        <div className="flex items-center justify-center fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-sm">
                <h2 className="text-lg font-semibold">Loading posts</h2>
                <div className="text-2xl font-mono mt-4">
                    <span className="animate-pulse">.</span>
                    <span className="animate-pulse delay-200">.</span>
                    <span className="animate-pulse delay-400">.</span>
                </div>
            </div>
        </div>
    );
};
