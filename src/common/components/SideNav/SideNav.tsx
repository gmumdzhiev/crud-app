import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollHorizontal, faCircleInfo, faChevronUp } from '@fortawesome/free-solid-svg-icons';

export const SideNav = ({ isOpen, closeSideNav }: { isOpen: boolean; closeSideNav: () => void }) => {
    const location = useLocation();
    const [isMenuOpen, setIsMenuOpen] = useState(true);

    return (
        <>
            {isOpen && <div className="fixed inset-0 bg-black opacity-50 md:hidden z-30" onClick={closeSideNav}></div>}

            <nav className={`shadow-md bg-white text-black p-4 h-full fixed left-0 top-22 w-64 md:w-1/4 transition-transform transform z-40 
                ${isOpen ? "translate-x-0" : "-translate-x-full"} md:translate-x-0`}>


                <ul>
                    <li className="text-gray-500 font-medium mb-2 flex justify-between items-center cursor-pointer p-2 hover:bg-gray-200 rounded-lg"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        Menu
                        <FontAwesomeIcon icon={faChevronUp} className={`text-gray-500 transition-transform duration-300 ${isMenuOpen ? "rotate-180" : ""}`} />
                    </li>
                    <ul className={`ml-4 transition-all duration-300 ${isMenuOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0 overflow-hidden"}`}>
                        <Link to="/content" onClick={closeSideNav}>
                            <li className={`mb-2 p-2 hover:bg-[#c1d9f7] hover:rounded-lg group cursor-pointer flex items-center gap-2 
                                ${location.pathname === "/content" ? "text-[#2f89fc] font-semibold" : "text-[#474747]"}`}>
                                <FontAwesomeIcon icon={faSquarePollHorizontal} className={`${location.pathname === "/content" ? "text-[#2f89fc]" : "text-[#474747]"} group-hover:text-[#2f89fc]`} />
                                <span className="font-roboto group-hover:text-[#2f89fc]">Content</span>
                            </li>
                        </Link>
                        <Link to="/about" onClick={closeSideNav}>
                            <li className={`mb-2 p-2 hover:bg-[#c1d9f7] hover:rounded-lg group cursor-pointer flex items-center gap-2 
                                ${location.pathname === "/about" ? "text-[#2f89fc] font-semibold" : "text-[#474747]"}`}>
                                <FontAwesomeIcon icon={faCircleInfo} className={`${location.pathname === "/about" ? "text-[#2f89fc]" : "text-[#474747]"} group-hover:text-[#2f89fc]`} />
                                <span className="font-roboto group-hover:text-[#2f89fc]">About</span>
                            </li>
                        </Link>
                    </ul>
                </ul>
            </nav>
        </>
    );
};
