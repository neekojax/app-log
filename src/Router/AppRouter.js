import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import FileUpload from '../components/FileUpload/FileUpload';
import Log from '../components/Log/log';
import logo from '../assets/images/logo.png'; // 引入 logo 图片
import './AppRouter.css'; // 引入样式文件


const AppRouter = () => {
    return (
        <Router>
            <AppContent />
        </Router>
    );
};

const AppContent = () => {
    const location = useLocation();

    return (
         <div className="AppRouter">
            {location.pathname === '/' && (
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/> {/* 只在 '/' 路由下显示 logo */}
                </div>
            )}
            <main>
                <Routes>
                    <Route path="/" element={<FileUpload/>}/>
                    <Route path="/log" element={<Log/>}/>
                </Routes>
            </main>
        </div>
    );
};

export default AppRouter;
