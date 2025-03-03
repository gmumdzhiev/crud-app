import React from 'react';
import {IProps} from "./IProps.ts";



export const ConfirmationModal = ({ isOpen, onClose, onConfirm, message }: IProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0  flex justify-center items-center z-50" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
            <div className="bg-white p-6 rounded-md shadow-lg max-w-sm w-full">
                <h3 className="text-lg font-semibold text-gray-700 mb-4">{message}</h3>
                <div className="flex justify-end">

                    <button
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md mr-3"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                    <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={onConfirm}
                    >
                        Delete
                    </button>

                </div>
            </div>
        </div>
    );
};
