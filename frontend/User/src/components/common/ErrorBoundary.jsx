import React from 'react';
import { useRouteError, isRouteErrorResponse, Link } from 'react-router-dom';

// Style cho component ErrorBoundary
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '80vh',
    padding: '2rem',
    textAlign: 'center',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 'bold',
    color: '#e53e3e',
    marginBottom: '1rem',
  },
  message: {
    fontSize: '1.2rem',
    color: '#4a5568',
    marginBottom: '2rem',
    maxWidth: '600px',
  },
  button: {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#3182ce',
    color: 'white',
    border: 'none',
    borderRadius: '0.375rem',
    fontSize: '1rem',
    cursor: 'pointer',
    textDecoration: 'none',
    display: 'inline-block',
    marginTop: '1rem',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    transition: 'all 0.2s',
  },
  homeButton: {
    backgroundColor: '#3182ce',
    marginRight: '1rem',
  },
  tryAgainButton: {
    backgroundColor: '#48bb78',
  },
  statusCode: {
    fontSize: '6rem',
    fontWeight: 'bold',
    color: '#e53e3e',
    marginBottom: '1rem',
    opacity: '0.3',
  },
  errorDetail: {
    fontSize: '0.875rem',
    color: '#718096',
    marginTop: '2rem',
    padding: '1rem',
    backgroundColor: '#f7fafc',
    borderRadius: '0.375rem',
    width: '100%',
    maxWidth: '800px',
    textAlign: 'left',
    overflow: 'auto',
  },
};

export default function ErrorBoundary() {
  const error = useRouteError();
  const isRouteError = isRouteErrorResponse(error);
  
  let title = 'Đã xảy ra lỗi';
  let message = 'Rất tiếc, đã xảy ra lỗi không mong muốn. Vui lòng thử lại sau.';
  let statusCode = null;
  
  // Tùy chỉnh thông báo dựa trên loại lỗi
  if (isRouteError) {
    statusCode = error.status;
    if (error.status === 404) {
      title = 'Không tìm thấy trang';
      message = 'Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.';
    } else if (error.status === 401) {
      title = 'Không được phép truy cập';
      message = 'Bạn cần đăng nhập để truy cập trang này.';
    } else if (error.status === 403) {
      title = 'Truy cập bị từ chối';
      message = 'Bạn không có quyền truy cập trang này.';
    } else if (error.status === 500) {
      title = 'Lỗi máy chủ';
      message = 'Đã xảy ra lỗi trên máy chủ. Vui lòng thử lại sau.';
    }
  } else if (error instanceof Error) {
    message = error.message;
  }

  return (
    <div style={styles.container}>
      {statusCode && <div style={styles.statusCode}>{statusCode}</div>}
      <h1 style={styles.title}>{title}</h1>
      <p style={styles.message}>{message}</p>
      
      <div>
        <Link to="/" style={{...styles.button, ...styles.homeButton}}>
          Về trang chủ
        </Link>
        <button 
          onClick={() => window.location.reload()} 
          style={{...styles.button, ...styles.tryAgainButton}}
        >
          Thử lại
        </button>
      </div>
      
      {process.env.NODE_ENV === 'development' && error && (
        <div style={styles.errorDetail}>
          <p><strong>Chi tiết lỗi (chỉ hiển thị trong môi trường phát triển):</strong></p>
          <p>{isRouteError ? error.data?.message || error.statusText : error.toString()}</p>
          {error.stack && <pre>{error.stack}</pre>}
        </div>
      )}
    </div>
  );
} 