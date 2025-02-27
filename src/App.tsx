import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';

function App() {
    const [count, setCount] = useState(0);

    return (
        <>
            <div className="flex justify-center items-center gap-10 mt-20">
                <a href="https://vite.dev" target="_blank">
                    <img src={viteLogo} className="logo w-20 h-20" alt="Vite logo" />
                </a>
                <a href="https://react.dev" target="_blank">
                    <img src={reactLogo} className="logo w-20 h-20" alt="React logo" />
                </a>
            </div>
            <h1 className="text-4xl font-bold text-center text-blue-500 mt-10">Vite + React</h1>
            <div className="card bg-gray-200 p-6 rounded-lg shadow-lg mt-10">
                <button
                    onClick={() => setCount((count) => count + 1)}
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    count is {count}
                </button>
                <p className="mt-4 text-center text-gray-600">
                    Edit <code>src/App.tsx</code> and save to test HMR
                </p>
            </div>
            <p className="read-the-docs text-center text-gray-500 mt-4">
                Click on the Vite and React logos to learn more
            </p>
        </>
    );
}

export default App;
