import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import './log.css';
import smallLogo from '../../assets/images/logo.jpeg';

const Log = () => {
    const location = useLocation();
    // const { results } = location.state || {};

        const { switchLog, powerLog } = location.state || { switchLog: [], powerLog: [] };
    const [activeLog, setActiveLog] = useState('switchLog');

    const renderLog = (logEntries) => (
        logEntries && Object.keys(logEntries).length > 0 ? (
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
            {/*<h3>处理结果:</h3>*/}
            <div className="button-group">
                <button onClick={() => setActiveLog('switchLog')}>矿机切换记录</button>
                <button onClick={() => setActiveLog('powerLog')}>开关机记录</button>
                <img src={smallLogo} alt="Logo" className="logo"/>
            </div>
            {/*<div className="results-list-wrapper">*/}
            <div className="show-log">
                {activeLog === 'switchLog' ? renderLog(switchLog) : renderLog(powerLog)}
            </div>
        </div>
    );
};

export default Log;
