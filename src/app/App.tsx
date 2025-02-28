import { Routes, Route } from 'react-router-dom';
import './App.css';
import { Header } from "../common/components/Header/Header.tsx";
import { SideNav } from "../common/components/SideNav/SideNav.tsx";
import { Content } from "../common/components/Content/Content.tsx";
import { About } from "../common/components/About/About.tsx"; // Assuming you have an About component

export const App = () => {
    return (
        <div className="flex flex-col h-screen">
            <Header className="bg-blue-500 text-white text-center py-4 fixed w-full top-0" />
            <div className="flex flex-1 pt-16">
                <SideNav />
                <Routes>
                    <Route path="/content" element={<Content />} />
                    <Route path="/about" element={<About />} />
                </Routes>
            </div>
        </div>
    );
};
