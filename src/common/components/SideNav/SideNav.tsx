import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNoteSticky, faCircleInfo, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

export const SideNav = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="w-1/4 bg-white text-black p-4 h-full fixed left-0 top-22 flex flex-col">
            <ul>
                <li
                    className="text-gray-500 font-medium mb-2 flex justify-between items-center cursor-pointer p-2 hover:bg-gray-200 rounded-lg"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    Menu
                    <FontAwesomeIcon
                        icon={faChevronUp}
                        className={`text-gray-500 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    />
                </li>

                <ul className={`ml-4 transition-all duration-300 ${isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                    <Link to="/content">
                        <li className="mb-2 p-2 hover:bg-[#c1d9f7] hover:rounded-lg group cursor-pointer flex items-center gap-2">
                            <FontAwesomeIcon icon={faNoteSticky} className="text-[#474747] group-hover:text-[#2f89fc]" />
                            <span className="font-roboto text-[#474747] group-hover:text-[#2f89fc]">Content</span>
                        </li>
                    </Link>
                    <Link to="/about">
                        <li className="mb-2 p-2 hover:bg-[#c1d9f7] hover:rounded-lg group cursor-pointer flex items-center gap-2">
                            <FontAwesomeIcon icon={faCircleInfo} className="text-[#474747] group-hover:text-[#2f89fc]" />
                            <span className="font-roboto text-[#474747] group-hover:text-[#2f89fc]">About</span>
                        </li>
                    </Link>
                </ul>
            </ul>
        </nav>
    );
};
