import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import styles from './Register.module.css';

const Register = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    agreeTerms: false
  });
  
  const [errors, setErrors] = useState({});
  const { register, loading, error, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  
  // Nếu đã đăng nhập, chuyển về trang chủ
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);
  
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Vui lòng nhập họ tên';
    }
    
    if (!formData.email) {
      newErrors.email = 'Vui lòng nhập email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email không hợp lệ';
    }
    
    if (!formData.password) {
      newErrors.password = 'Vui lòng nhập mật khẩu';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Mật khẩu xác nhận không khớp';
    }
    
    if (!formData.phone) {
      newErrors.phone = 'Vui lòng nhập số điện thoại';
    } else if (!/^[0-9]{10,11}$/.test(formData.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }
    
    if (!formData.agreeTerms) {
      newErrors.agreeTerms = 'Bạn phải đồng ý với điều khoản dịch vụ';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      try {
        await register({
          fullName: formData.fullName,
          email: formData.email,
          password: formData.password,
          phone: formData.phone
        });
        // Sau khi đăng ký thành công, useEffect sẽ chuyển hướng
      } catch (err) {
        console.error('Registration error:', err);
        setErrors({ form: err.message || 'Đăng ký thất bại. Vui lòng thử lại.' });
      }
    }
  };
  
  return (
    <div className={styles['login-container']}>
      <div className={styles['login-form']}>
        <h1 className={styles.title}>Đăng ký tài khoản</h1>
        
        {error && <div className={styles['error-message']}>{error}</div>}
        {errors.form && <div className={styles['error-message']}>{errors.form}</div>}
        
        <form onSubmit={handleSubmit}>
          <div className={styles['form-group']}>
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Nhập họ và tên"
              value={formData.fullName}
              onChange={handleChange}
              className={errors.fullName ? styles['input-error'] : ''}
            />
            {errors.fullName && <span className={styles['error-text']}>{errors.fullName}</span>}
          </div>
          
          <div className={styles['form-group']}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập địa chỉ email"
              value={formData.email}
              onChange={handleChange}
              className={errors.email ? styles['input-error'] : ''}
            />
            {errors.email && <span className={styles['error-text']}>{errors.email}</span>}
          </div>
          
          <div className={styles['form-group']}>
            <label htmlFor="password">Mật khẩu</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? styles['input-error'] : ''}
            />
            {errors.password && <span className={styles['error-text']}>{errors.password}</span>}
          </div>
          
          <div className={styles['form-group']}>
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? styles['input-error'] : ''}
            />
            {errors.confirmPassword && <span className={styles['error-text']}>{errors.confirmPassword}</span>}
          </div>
          
          <div className={styles['form-group']}>
            <label htmlFor="phone">Số điện thoại</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              value={formData.phone}
              onChange={handleChange}
              className={errors.phone ? styles['input-error'] : ''}
            />
            {errors.phone && <span className={styles['error-text']}>{errors.phone}</span>}
          </div>
          
          <div className={styles['form-options']}>
            <div className={styles['remember-me']}>
              <input
                type="checkbox"
                id="agreeTerms"
                name="agreeTerms"
                checked={formData.agreeTerms}
                onChange={handleChange}
              />
              <label htmlFor="agreeTerms">
                Tôi đồng ý với điều khoản dịch vụ
              </label>
            </div>
          </div>
          {errors.agreeTerms && <span className={styles['error-text']}>{errors.agreeTerms}</span>}
          
          <button
            type="submit"
            className={styles['login-button']}
            disabled={loading}
          >
            {loading ? 'Đang đăng ký...' : 'Đăng ký'}
          </button>
        </form>
        
        <div className={styles['register-link']}>
          Đã có tài khoản? <Link to="/login">Đăng nhập</Link>
        </div>
      </div>
    </div>
  );
};

export default Register; 