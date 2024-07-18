import React from 'react';

const Skeleton = () => {
    return (
        <div className="bg-white rounded-lg shadow-lg overflow-hidden w-500 h-500">

            <div className="bg-gray-300 h-56 w-full animate-pulse">
            </div>

            <div className="p-4 flex-grow flex flex-col justify-between">

                <div className="bg-gray-300 h-6 w-2/3 mb-4 animate-pulse"></div>

                <div className="bg-gray-300 h-4 w-1/3 animate-pulse"></div>


                <div className="mt-4">
                    <div className="bg-gray-300 h-8 w-1/4 animate-pulse"></div>
                </div>


                <div className="mt-4 self-center">
                    <div className="bg-blue-500 text-white py-2 px-4 rounded-lg w-1/2 animate-pulse"></div>
                </div>
            </div>
        </div>
    );
};

export default Skeleton;
