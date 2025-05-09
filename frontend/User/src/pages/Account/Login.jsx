import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Login.module.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({});
  const { login, loading, error, isAuthenticated } = useAuth();
  
  const navigate = useNavigate();
  const location = useLocation();
  
  // Nếu có returnUrl từ state, sử dụng nó để chuyển hướng sau khi đăng nhập
  const returnUrl = location.state?.returnUrl || '/';
  const redirectMessage = location.state?.message;
  
  // Log khi component được render
  useEffect(() => {
    console.log('[Login] Component rendered', { 
      isAuthenticated,
      returnUrl,
      hasRedirectMessage: !!redirectMessage
    });
  }, []);

  // Nếu đã đăng nhập, chuyển về trang chủ
  useEffect(() => {
    if (isAuthenticated) {
      console.log('[Login] User already authenticated, redirecting to:', returnUrl);
      navigate(returnUrl, { replace: true });
    }
  }, [isAuthenticated, navigate, returnUrl]);
  
  const validateForm = () => {
    console.log('[Login] Validating form');
    const newErrors = {};
    
    if (!email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    setErrors(newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log('[Login] Form validation result:', { isValid, errors: Object.keys(newErrors) });
    return isValid;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('[Login] Form submitted');
    
    if (validateForm()) {
      try {
        console.log('[Login] Attempting login');
        await login(email, password);
        console.log('[Login] Login successful, redirect will happen in useEffect');
        // Sau khi đăng nhập thành công, useEffect sẽ chuyển hướng
      } catch (err) {
        console.error('[Login] Login failed:', err);
        setErrors({ form: err.message || 'Đăng nhập thất bại. Vui lòng thử lại.' });
      }
    }
  };
  
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <h1 className={styles.title}>Đăng nhập</h1>
        
        {error && <div className={styles['error-message']}>{error}</div>}
        {errors.form && <div className={styles['error-message']}>{errors.form}</div>}
        {redirectMessage && <div className={styles['info-message']}>{redirectMessage}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Nhập email của bạn"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? styles['input-error'] : ''}
            />
            {errors.email && <span className={styles['error-text']}>{errors.email}</span>}
          </div>
          
          <div className={styles['form-group']}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={errors.password ? styles['input-error'] : ''}
            />
            {errors.password && <span className={styles['error-text']}>{errors.password}</span>}
          </div>
          
          <div className={styles['form-options']}>
            <div className={styles['remember-me']}>
              <input
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label htmlFor="rememberMe">Ghi nhớ đăng nhập</label>
            </div>
            
            <Link to="/forgot-password" className={styles['forgot-password']}>
              Quên mật khẩu?
            </Link>
          </div>
          
          <button
            type="submit"
            className={styles['login-button']}
            disabled={loading}
          >
            {loading ? 'Đang đăng nhập...' : 'Đăng nhập'}
          </button>
        </form>
        
        <div className={styles['register-link']}>
          Chưa có tài khoản? <Link to="/register">Đăng ký ngay</Link>
        </div>
      </div>
    </div>
  );
};

export default Login; 