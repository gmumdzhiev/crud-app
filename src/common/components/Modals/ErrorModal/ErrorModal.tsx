import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faExclamationCircle} from "@fortawesome/free-solid-svg-icons";
import {IProps} from "./IProps.ts";

export const ErrorModal = ({ error, onClose }: IProps) => {
    return (
        <div className="flex items-center justify-center fixed inset-0 bg-gray-800 bg-opacity-50 z-50">
            <div className="bg-red-100 p-6 rounded-lg shadow-lg w-full max-w-sm text-center">
                <FontAwesomeIcon className="text-4xl text-red-600 mx-auto" icon={faExclamationCircle} size="lg" />
                <h2 className="text-xl font-semibold mt-4 text-red-600">Oops! Something went wrong</h2>
                <p className="mt-2 text-red-500">{error}</p>
                <button
                    onClick={onClose}
                    className="mt-4 py-2 px-4 bg-red-600 text-white rounded-md hover:bg-red-700"
                >
                    Close
                </button>
            </div>
        </div>
    );
};
