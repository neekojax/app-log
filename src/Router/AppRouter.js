import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../assets/images/logo.png'; // 引入 logo 图片
import FileUpload from '../components/FileUpload/FileUpload';
import Log from '../components/Log/log';
import NavBar from '../components/NavBar/navbar';
import Login from '../components/Login/login';

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
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState(''); // 新增状态变量
    const [selectedLogType, setSelectedLogType] = useState('switchLog'); // 新增状态变量

    useEffect(() => {
        const token = Cookies.get('token');
        const storedUsername = Cookies.get('username'); // 从 Cookies 中获取用户名
        if (token) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
    }, []);

    const handleLogButtonClick = (logType) => {
        setSelectedLogType(logType);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
        const storedUsername = Cookies.get('username'); // 从 Cookies 中获取用户名
        setUsername(storedUsername);
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUsername(''); // 清空用户名
        console.log('用户已登出');
    };

    return (
         <div className="AppRouter">
             <NavBar
                 handleLogButtonClick={handleLogButtonClick}
                 selectedLogType={selectedLogType}
                 handleLogout={handleLogout}
                 isLoggedIn={isLoggedIn}
                 username={username} // 传递用户名
             />
            {(location.pathname === '/' || location.pathname === '/upload')&& (
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/> {/* 只在 '/' 路由下显示 logo */}
                </div>
            )}
            <main>
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Navigate to="/upload" /> : <Login onLogin={handleLogin} />} />
                    <Route path="/upload" element={isLoggedIn ? <FileUpload /> : <Navigate to="/" />} />
                    <Route path="/log" element={isLoggedIn ? <Log selectedLogType={selectedLogType} /> : <Navigate to="/" />} />
                </Routes>
            </main>
        </div>
    );
};

export default AppRouter;
