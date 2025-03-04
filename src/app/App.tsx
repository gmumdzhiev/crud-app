import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {Header} from "../common/components/Header/Header.tsx";
import {SideNav} from "../common/components/SideNav/SideNav.tsx";
import {Content} from "../common/components/Content/Content.tsx";
import {About} from "../common/components/About/About.tsx";


export const App = () => {
    const [isSideNavOpen, setIsSideNavOpen] = useState(false);

    return (
        <div className="flex flex-col h-screen">
            <Header toggleSideNav={() => setIsSideNavOpen(true)} />

            <div className="flex flex-1 pt-16">
                <SideNav isOpen={isSideNavOpen} closeSideNav={() => setIsSideNavOpen(false)} />
                <div className="flex-1 ml-0 md:ml-64">
                    <Routes>
                        <Route path="/content" element={<Content />} />
                        <Route path="/about" element={<About />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};
