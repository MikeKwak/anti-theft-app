import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage';
import StartPage from './pages/StartPage';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<StartPage />} />
                <Route path="/activate" element={<MainPage />} />
            </Routes>
        </>
    );
}

export default App;
