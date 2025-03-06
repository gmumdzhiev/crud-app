import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Header = ({ toggleSideNav }: { toggleSideNav: () => void }) => {
    return (
        <header className="bg-white z-99 shadow-md text-[#2f89fc] py-4 fixed w-full top-0 flex justify-between items-center px-4 z-40">
            <button
                onClick={toggleSideNav}
                className="md:hidden p-2 rounded-full hover:bg-[#2f89fc] hover:text-white transition-all duration-200"
            >
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>

            <div className="flex items-center justify-center space-x-4">
                <h2 className="text-3xl font-bold text-[#2f89fc]">CRUD-APP</h2>
            </div>
        </header>
    );
};
