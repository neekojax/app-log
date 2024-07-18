// src/components/Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import './login.css';

const Login = ({onLogin}) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    // 获取指定名称的cookie值
    function getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            setError('请输入用户名和密码。');
            return;
        }

        try {
            //这里可以添加实际的登录逻辑，比如发送请求到服务器
            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });
            if (response.ok) {
                const data = await response.json();
                // const token = response.headers.get('Set-Cookie').split(';')[0].split('=')[1];
                Cookies.set('token', data.token, { expires: 1 }); // 保存token到cookie，设置过期时间为1天

                onLogin(); // 调用父组件传递的 onLogin 方法
                navigate('/upload'); // 登录成功后跳转到文件上传页面
            } else {
                setError('用户名或密码错误。');
            }
        } catch (error) {
            setError('登录时发生错误。');
        }
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2>登录</h2>
                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        {/*<label htmlFor="username">用户名</label>*/}
                        <input
                            type="text"
                            id="username"
                            placeholder="用户名"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        {/*<label htmlFor="password">密码</label>*/}
                        <input
                            type="password"
                            id="password"
                            placeholder="密码"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="login-button">登录</button>
                    {error && <p className="error-message">{error}</p>}
                </form>
            </div>
        </div>
    );
};

export default Login;
