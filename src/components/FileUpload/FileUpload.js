import React, { useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import './FileUpload.css';

const FileUpload = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploadStatus, setUploadStatus] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0);
    const [showProgressBar, setShowProgressBar] = useState(false); // 添加状态变量来控制进度条的显示
    const [processResults, setProcessResults] = useState({}); // 添加状态变量来存储处理结果
    const [isUploading, setIsUploading] = useState(false); // 添加状态变量来指示文件是否正在上传
    const [isProcessing, setIsProcessing] = useState(false);

    const navigate = useNavigate();

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
        setUploadStatus(''); // 清除之前的状态
        setUploadProgress(0); // 重置上传进度
        setShowProgressBar(false); // 隐藏进度条
        setProcessResults({}); // 重置处理结果
    };

    const handleUpload = async () => {

        if (!selectedFile) {
            setUploadStatus('请先选择一个文件。');
            return;
        }
        setShowProgressBar(true); // 显示进度条
        setIsUploading(true); // 设置文件正在上传的状态

        const formData = new FormData();
        formData.append('file', selectedFile);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', 'http://localhost:8080/upload', true);

        // 获取 token
        const token = Cookies.get('token');

        // 设置请求头中的 Authorization 字段
        if (token) {
            xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        }

        xhr.upload.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentCompleted = Math.round((event.loaded * 100) / event.total);
                setUploadProgress(percentCompleted);
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                setUploadStatus('文件上传成功。');
            } else {
                setUploadStatus('文件上传失败。');
            }
            setShowProgressBar(false); // 上传完成后隐藏进度条
            setIsUploading(false); // 清除文件正在上传的状态
        };

        xhr.onerror = () => {
            setUploadStatus('上传文件时发生错误。');
            setShowProgressBar(false); // 上传完成后隐藏进度条
            setIsUploading(false); // 清除文件正在上传的状态
        };

        xhr.send(formData);
    };


    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

        const handleUpdateCache = async () => {
        if (!selectedFile) {
            //setUploadStatus('请先选择一个文件。');
            return;
        }

        if (isUploading) {
            alert('文件正在上传中，稍后再试。');
            return;
        }

        setIsProcessing(true); // 开始处理时设置为 true

        try {
            await sleep(500);
            const token = Cookies.get('token'); // 从cookie获取token
            // 使用 Fetch API 接收数据
            fetch('http://localhost:8080/update', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`, // 设置Authorization头
                    'Content-Type': 'application/json',
                    credentials: 'include'
                },
                body: JSON.stringify({ fileName: selectedFile.name })
            })
                .then(response => response.json())
                .then(data => {
                    setUploadStatus('文件处理成功。');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setUploadStatus('文件处理失败。');
                });

        } catch (error) {
            console.error('处理文件出错:', error);
            setUploadStatus('处理文件时发生错误。');
        } finally {
            setIsProcessing(false); // 无论成功或失败都设置为 false
        }
    };

    const handleFetchCache = async () => {

        try {
            await sleep(500);
            const token = Cookies.get('token'); // 从cookie获取token
            // 使用 Fetch API 接收数据
            fetch('http://localhost:8080/fetch', {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`, // 设置Authorization头
                    'Content-Type': 'application/json',
                    credentials: 'include'
                },
            })
                .then(response => response.json())
                .then(data => {
                    setProcessResults(data); // 假设 data 是一个对象，其中包含所有缓存结果
                    navigate('/log', { state: { allResults: data } }); // 将所有结果传递到 /log 路由
                    setUploadStatus('数据获取成功。');
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                    setUploadStatus('数据获取失败。');
                });

        } catch (error) {
            console.error('数据获取出错:', error);
            setUploadStatus('获取数据时发生错误。');
        }
    };

    const handleProcess = async () => {
        console.log('Starting handleUpdateCache');
        handleUpdateCache()
            .then(() => {
                console.log('Starting handleFetchCache');
                return handleFetchCache();
            })
            .then(() => {
                console.log('Completed handleFetchCache');
            })
            .catch((error) => {
                console.error('Error occurred during handleProcess:', error);
            });
    };

    return (
        <div className="file-upload-container">
            <input type="file" onChange={handleFileChange} className="file-input"/>
            <div className="upload-button-group">
                <button onClick={handleUpload} className="upload-button">Upload</button>
                <button onClick={handleProcess} className="process-button" >Process</button>
            </div>
            {showProgressBar && (
                <div className="progress-bar-container">
                    <div className="progress-bar" style={{width: `${uploadProgress}%`}}></div>
                </div>
            )}
            <p className="upload-status">{uploadStatus}</p>
            {isProcessing && (
                <div className="loading-container">
                    <div className="spinner"></div>
                    <p>正在处理文件，请稍候...</p>
                </div>
            )}
        </div>
    );
};

export default FileUpload;
