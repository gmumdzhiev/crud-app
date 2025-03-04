import {IProps} from "./IProps.ts";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCircleXmark} from "@fortawesome/free-solid-svg-icons";

export const Drawer = ({
                           isOpen,
                           onClose,
                           title,
                            children
}:IProps) => {
    return(
        <div className={`fixed inset-0 z-50 transition-all ${isOpen ? "visible opacity-100" : "invisible opacity-0"}`}>
            <div
                className="fixed inset-0"
                style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
                onClick={onClose}
            />

            <div className={`fixed right-0 top-0 h-full w-96 bg-white shadow-lg transform transition-transform duration-300 ${isOpen ? "translate-x-0" : "translate-x-full"}`}>
                <div className="p-4 flex justify-between items-center border-b border-[#2f89fc]">
                    <h2 className="text-lg font-semibold text-[#474747]">{title}</h2>
                    <button onClick={onClose} className="text-[#474747] hover:text-[#2f89fc] hover:cursor-pointer"><FontAwesomeIcon icon={faCircleXmark}/></button>
                </div>
                <div className="p-4">{children}</div>
            </div>
        </div>
    )

}