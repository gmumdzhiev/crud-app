import React from "react";
import { IProps } from "./IProps";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardFast, faChevronLeft, faChevronRight, faForwardFast } from "@fortawesome/free-solid-svg-icons";

export const Pagination = ({
                               postsPerPage,
                               filteredPosts,
                               currentPage,
                               setCurrentPage,
                           }: IProps) => {
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const getPaginationButtons = () => {
        const pages: (number | string)[] = [];

        if (totalPages <= 5) {
            for (let i = 1; i <= totalPages; i++) {
                pages.push(i);
            }
        } else {
            pages.push(1);

            if (currentPage > 3) pages.push("...");

            for (let i = Math.max(2, currentPage - 1); i <= Math.min(totalPages - 1, currentPage + 1); i++) {
                pages.push(i);
            }

            if (currentPage < totalPages - 2) pages.push("...");

            pages.push(totalPages);
        }

        return pages;
    };

    return (
        <div className="flex justify-center mt-4 space-x-2">
            <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded 
                    ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc] cursor-pointer"}`}
            >
                <FontAwesomeIcon icon={faBackwardFast} />
            </button>


            <button
                onClick={() => setCurrentPage(currentPage - 1)}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded 
                    ${currentPage === 1 ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc] cursor-pointer"}`}
            >
                <FontAwesomeIcon icon={faChevronLeft} />
            </button>

            {getPaginationButtons().map((page, index) =>
                typeof page === "number" ? (
                    <button
                        key={index}
                        onClick={() => setCurrentPage(page)}
                        className={`px-4 py-2 rounded font-semibold cursor-pointer 
                            ${currentPage === page ? "bg-[#c1d9f7] text-[#2f89fc] font-bold" : "bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc]"}`}
                    >
                        {page}
                    </button>
                ) : (
                    <span key={index} className="px-2 py-2 text-[#474747]">...</span>
                )
            )}

            <button
                onClick={() => setCurrentPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded 
                    ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc] cursor-pointer"}`}
            >
                <FontAwesomeIcon icon={faChevronRight} />
            </button>

            <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded 
                    ${currentPage === totalPages ? "bg-gray-300 cursor-not-allowed text-gray-500" : "bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc] cursor-pointer"}`}
            >
                <FontAwesomeIcon icon={faForwardFast} />
            </button>
        </div>
    );
};
