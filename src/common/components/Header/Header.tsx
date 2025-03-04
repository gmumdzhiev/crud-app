import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Header = ({ toggleSideNav }: { toggleSideNav: () => void }) => {
    return (
        <header className="bg-blue-500 text-white py-4 fixed w-full top-0 flex justify-between items-center px-4 z-40 ">
            <button onClick={toggleSideNav} className="md:hidden ">
                <FontAwesomeIcon icon={faBars} className="text-2xl" />
            </button>
            <h1 className="text-xl font-semibold mx-auto">Header</h1>
        </header>
    );
};
