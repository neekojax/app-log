// src/components/NavBar/NavBar.js
import React from 'react';
import { useNavigate, useLocation} from 'react-router-dom';
import './navbar.css';
import LogoutButton from '../Logout/logout';
import smallLogo from '../../assets/images/logo.jpeg';

const NavBar = ({ handleLogButtonClick, selectedLogType, handleLogout, isLoggedIn, username  }) => {
    const navigate = useNavigate();
    const location = useLocation();

    const isLogPage = location.pathname.includes('/log');
    const isLoginPage = location.pathname === '/' && !isLoggedIn;

    return (
        <div className="navbar">
            <div className={`button-group ${isLogPage ? '' : 'hidden'}`}>
                <img src={smallLogo} alt="Logo" className="logo"/>
                <button onClick={() => navigate('/')} className="index">首页</button>
                <button
                    onClick={() => handleLogButtonClick('switchLog')}
                    className={selectedLogType === 'switchLog' ? 'selected' : ''}
                >
                    矿机切换记录
                </button>
                <button
                    onClick={() => handleLogButtonClick('powerLog')}
                    className={selectedLogType === 'powerLog' ? 'selected' : ''}
                >
                    开关机记录
                </button>
            </div>
            {!isLoginPage && <LogoutButton onLogout={handleLogout} username={username} />} {/* 使用 LogoutButton 组件，排除 login 界面 */}
        </div>
    );
};

export default NavBar;
