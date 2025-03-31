import React from 'react';
import ReactDOM from 'react-dom/client';
import AppRouter from './routers/AppRouter'; 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AppRouter /> {/* Sử dụng AppRouter để bao bọc các route */}
  </React.StrictMode>
);