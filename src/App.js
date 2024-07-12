import React from 'react';
import './App.css';
import AppRouter from './Router/AppRouter'
import logo from './assets/images/logo.png'; // 确保logo.png文件存在于项目中

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <AppRouter />
            </header>
        </div>
    );
}

export default App;
