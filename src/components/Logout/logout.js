// src/components/LogoutButton/LogoutButton.js
import React from 'react';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';

const LogoutButton = ({ onLogout }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove('token'); // 移除Token
        onLogout(); // 更新登录状态
        navigate('/'); // 重定向到登录页面
    };

    return (
        <button onClick={handleLogout}>
            退出
        </button>
    );
};

export default LogoutButton;
