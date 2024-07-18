import React, {useState, useEffect} from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import FileUpload from '../components/FileUpload/FileUpload';
import Log from '../components/Log/log';
import logo from '../assets/images/logo.png'; // 引入 logo 图片
import Login from '../components/Login/login';
import Logout from '../components/Logout/logout';
import './AppRouter.css'; // 引入样式文件
import Cookies from 'js-cookie';


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

    useEffect(() => {
        const token = Cookies.get('token');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    return (
         <div className="AppRouter">
            {(location.pathname === '/' || location.pathname === '/upload')&& (
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/> {/* 只在 '/' 路由下显示 logo */}
                </div>
            )}
            <main>
                <Routes>
                    <Route path="/" element={isLoggedIn ? <Navigate to="/upload" /> : <Login onLogin={() => setIsLoggedIn(true)} />} />
                    <Route path="/upload" element={isLoggedIn ? <FileUpload /> : <Navigate to="/" />} />
                    <Route path="/log" element={isLoggedIn ? <Log /> : <Navigate to="/" />} />
                </Routes>
                {isLoggedIn && <Logout />} {/* 在用户登录时显示退出按钮 */}
            </main>
        </div>
    );
};

export default AppRouter;
