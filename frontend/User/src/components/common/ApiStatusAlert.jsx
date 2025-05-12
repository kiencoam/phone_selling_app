import React, { useState, useEffect } from 'react';
import { API_CONFIG } from '../../constants/api';

/**
 * Component hiển thị thông báo về trạng thái kết nối API
 */
const ApiStatusAlert = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [apiStatus, setApiStatus] = useState('checking');

  useEffect(() => {
    const checkApiStatus = async () => {
      try {
        // Thời gian chờ ngắn để kiểm tra API
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000);
        
        const response = await fetch(`${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.PRODUCTS}?page=0&size=1`, {
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        if (response.ok) {
          setApiStatus('online');
        } else {
          setApiStatus('error');
        }
      } catch (error) {
        console.error('[ApiStatusAlert] Error checking API status:', error);
        setApiStatus('offline');
      }
    };
    
    checkApiStatus();
  }, []);
  
  if (!isVisible) {
    return null;
  }
  
  let message = '';
  let backgroundColor = '';
  
  switch (apiStatus) {
    case 'checking':
      message = 'Đang kiểm tra kết nối với API...';
      backgroundColor = '#3498db';
      break;
    case 'online':
      message = 'Đã kết nối với API thực.';
      backgroundColor = '#2ecc71';
      break;
    case 'error':
      message = 'API gặp lỗi. Đang sử dụng dữ liệu mẫu.';
      backgroundColor = '#e67e22';
      break;
    case 'offline':
      message = 'Không thể kết nối tới API. Đang sử dụng dữ liệu mẫu.';
      backgroundColor = '#e74c3c';
      break;
    default:
      return null;
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '20px',
      right: '20px',
      padding: '10px 15px',
      backgroundColor,
      color: 'white',
      borderRadius: '4px',
      boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
      zIndex: 9999,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      maxWidth: '300px'
    }}>
      <span>{message}</span>
      <button 
        onClick={() => setIsVisible(false)}
        style={{
          backgroundColor: 'transparent',
          border: 'none',
          color: 'white',
          marginLeft: '10px',
          cursor: 'pointer',
          fontSize: '16px'
        }}
      >
        ×
      </button>
    </div>
  );
};

export default ApiStatusAlert; 