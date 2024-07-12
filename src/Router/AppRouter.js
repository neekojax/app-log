import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FileUpload from '../components/FileUpload/FileUpload';
import Log from '../components/Log/log';

const AppRouter = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<FileUpload />} />
                <Route path="/log" element={<Log />} />
            </Routes>
        </Router>
    );
};

export default AppRouter;
