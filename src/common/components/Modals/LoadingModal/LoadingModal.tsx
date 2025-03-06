
export const LoadingModal = () => {
    return (
        <div style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} className="flex items-center justify-center fixed inset-0 bg-gray-800 z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center w-full max-w-sm text-[#474747]">
                <div className='flex space-x-2 justify-center items-center bg-white  '>
                    <span className='text-lg font-semibold'>Loading posts</span>
                    <div className='h-2 w-2 bg-[#474747] rounded-full animate-bounce [animation-delay:-0.3s]'></div>
                    <div className='h-2 w-2 bg-[#474747] rounded-full animate-bounce [animation-delay:-0.15s]'></div>
                    <div className='h-2 w-2 bg-[#474747]  rounded-full animate-bounce'></div>
                </div>
            </div>
        </div>
            );
            };
