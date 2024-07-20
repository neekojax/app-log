// src/components/Log/Log.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './log.css';

const Log = ({ selectedLogType }) => {
    const location = useLocation();

    // 接收所有结果
    const { allResults } = location.state || { allResults: {} };
    const [selectedKey, setSelectedKey] = useState(null);
    const [selectedResult, setSelectedResult] = useState(null);

    // 设置第一个 key 为默认选中值，并设置默认结果为 switchLog
    useEffect(() => {
        const keys = Object.keys(allResults);
        if (keys.length > 0) {
            const defaultKey = keys[0];
            setSelectedKey(defaultKey);
            setSelectedResult(allResults[defaultKey][selectedLogType] || null);
        }
    }, [allResults, selectedLogType]);

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

    const renderLogButtons = () => (
        Object.keys(allResults).map((key) => {
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
