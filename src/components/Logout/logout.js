// src/components/LogoutButton/LogoutButton.js
import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import './logout.css'

const LogoutButton = ({ onLogout, username }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token'); // 移除Token
        onLogout(); // 更新登录状态
        navigate('/'); // 重定向到登录页面
    };

    return (
        <div className="logout-container">
            <span className="username-span">Hi, {username}</span> {/* 显示用户名 */}
            <button onClick={onLogout} className="logout-button">登出</button>
        </div>
    );
};

export default LogoutButton;
