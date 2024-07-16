import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './log.css';
import smallLogo from '../../assets/images/logo.jpeg';

const Log = () => {
    const location = useLocation();

    // 接收所有结果
    const { allResults } = location.state || { allResults: {} };
    const [selectedKey, setSelectedKey] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);
    const [selectedLogType, setSelectedLogType] = useState(null); // 新增状态变量

    const navigate = useNavigate();

    // 设置第一个 key 为默认选中值，并设置默认结果为 switchLog
    useEffect(() => {
        const keys = Object.keys(allResults);
        if (keys.length > 0) {
            const defaultKey = keys[0];
            setSelectedKey(defaultKey);
            setSelectedResult(allResults[defaultKey]['switchLog'] || null);
            setSelectedLogType('switchLog'); // 设置默认日志类型为 switchLog
        }
    }, [allResults]);


    // 当点击按钮时，显示对应的结果
    const handleButtonClick = (key) => {
        setSelectedKey(key);
        // 使用之前的日志类型来设置选中的结果
        if (selectedLogType && allResults[key][selectedLogType]) {
            setSelectedResult(allResults[key][selectedLogType]);
        } else {
            setSelectedResult(null); // 如果没有找到相应的日志类型，则清空结果
        }
    };

    // 当点击 switchLog 或 powerLog 按钮时，显示对应的结果
    const handleLogButtonClick = (logType) => {
        if (selectedKey) {
            setSelectedResult(allResults[selectedKey][logType]);
            setSelectedLogType(logType); // 设置当前选中的日志类型
        }
    };

    const renderLogButtons = () => (
        Object.keys(allResults).map((key) => {
            // const displayText = key.length > 25 ? key.slice(-25) : key;
            const displayText = key.length > 25 ? key.slice(0, 23) + '...' : key;
            return (
                <button
                    key={key}
                    onClick={() => handleButtonClick(key)}
                    className={selectedKey === key ? 'selected' : ''}
                >
                    {displayText}
                </button>
            );
        })
    );

    const renderLog = (logEntries) => (
        logEntries ? (
            Object.entries(logEntries).map(([key, values]) => (
                <div key={key}>
                    <h4>{key}</h4>
                    <div className="results-list-wrapper">
                        <ul>
                            {values.map((value, index) => (
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            ))
        ) : (
            <p>没有处理结果。</p>
        )
    );

    return (
        <div className="process-results">
            <div className="button-group">
                <img src={smallLogo} alt="Logo" className="logo"/>
                <button onClick={() => navigate('/')} className="index">首页</button>
                <button onClick={() => handleLogButtonClick('switchLog')}
                        className={selectedLogType === 'switchLog' ? 'selected' : ''}>矿机切换记录
                </button>
                <button onClick={() => handleLogButtonClick('powerLog')}
                        className={selectedLogType === 'powerLog' ? 'selected' : ''}>开关机记录
                </button>
            </div>
            <div className="content-wrapper">
                <div className="button-group-2">
                    <div className="log-header">
                        日志文件列表
                    </div>
                    {renderLogButtons()}
                </div>
                <div className="show-log">
                    {renderLog(selectedResult)}
                </div>
            </div>
        </div>
    );
};

export default Log;
