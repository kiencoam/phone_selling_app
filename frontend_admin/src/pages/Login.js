import React, { useState } from 'react';
import { Form, Button, Alert, Container, Card } from 'react-bootstrap';
import { Navigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [formError, setFormError] = useState('');
  
  const { login, error, currentUser } = useAuth();

  // Nếu đã đăng nhập, chuyển về trang chủ
  if (currentUser) {
    return <Navigate to="/" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra dữ liệu form
    if (!email || !password) {
      setFormError('Vui lòng nhập email và mật khẩu');
      return;
    }
    
    setLoading(true);
    setFormError('');
    
    try {
      console.log('Attempting login with:', { email, password: '****' });
      const success = await login(email, password);
      
      console.log('Login result:', success);
      
      if (!success) {
        setFormError('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
      }
    } catch (error) {
      console.error('Login component error:', error);
      setFormError('Đã xảy ra lỗi khi đăng nhập: ' + (error.message || 'Lỗi không xác định'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <Container>
        <div className="login-form">
          <div className="login-logo">
            <h1 style={{ color: '#000', fontWeight: 'bold' }}>
              <span style={{ color: '#FEE800' }}>the</span>gioididong
              <span style={{ fontSize: '0.7em', color: '#FEE800' }}>.com</span>
            </h1>
            <p className="text-muted">Hệ thống quản lý dành cho nhân viên</p>
          </div>
          
          <Card className="shadow-sm">
            <Card.Body>
              <h4 className="text-center mb-4">Đăng nhập</h4>
              
              {(error || formError) && (
                <Alert variant="danger" className="mb-3">
                  {error || formError}
                </Alert>
              )}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Nhập email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>

                <Form.Group className="mb-4" controlId="formPassword">
                  <Form.Label>Mật khẩu</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Nhập mật khẩu"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </Form.Group>

                <div className="d-grid gap-2">
                  <Button 
                    type="submit" 
                    className="btn-primary-tgdd"
                    disabled={loading}
                  >
                    {loading ? 'Đang xử lý...' : 'Đăng nhập'}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Login; 