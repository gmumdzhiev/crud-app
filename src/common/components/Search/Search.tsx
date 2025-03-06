import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlus, faSearch} from "@fortawesome/free-solid-svg-icons";
import {IProps} from "./IProps.ts";

export const Search = ({search, setSearch, setIsDrawerOpen}: IProps) => {
    return (
        <div className="flex mb-4">
            <button
                className="bg-[#ebe8e8] text-[#474747] hover:bg-[#c1d9f7] hover:text-[#2f89fc] hover:cursor-pointer w-[50px] h-[50px] rounded mr-2"
                onClick={() => setIsDrawerOpen(true)}
            >
                <FontAwesomeIcon icon={faPlus} />
            </button>
            <div className="relative w-full text-[#474747]">
                <div className="flex items-center border-1 border-[#474747] rounded h-[50px]">
                    <FontAwesomeIcon icon={faSearch} className="ml-3 text-[#474747]" />
                    <input
                        type="text"
                        placeholder="Search posts..."
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full h-[50px] p-2 border-0 rounded pl-3 focus:outline-none"
                    />
                </div>
            </div>
        </div>
    )
}