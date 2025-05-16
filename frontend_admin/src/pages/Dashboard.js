import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import useAuth from '../hooks/useAuth';

const Dashboard = () => {
  const { currentUser } = useAuth();
  
  // Các thông số giả để hiển thị trên Dashboard
  const stats = [
    { title: 'Tổng đơn hàng', value: '58', icon: 'bi bi-cart-fill', color: '#FEE800' },
    { title: 'Đơn chờ xử lý', value: '12', icon: 'bi bi-hourglass-split', color: '#dc3545' },
    { title: 'Sản phẩm', value: '182', icon: 'bi bi-phone-fill', color: '#17a2b8' },
    { title: 'Khách hàng', value: '234', icon: 'bi bi-people-fill', color: '#28a745' }
  ];

  return (
    <div>
      <h2 className="mb-4">Trang chủ</h2>
      
      <Card className="mb-4">
        <Card.Body>
          <h5>Xin chào, {currentUser?.fullName || 'Nhân viên'}!</h5>
          <p className="text-muted">Chào mừng đến với hệ thống quản lý của Thế Giới Di Động</p>
        </Card.Body>
      </Card>
      
      <Row>
        {stats.map((stat, index) => (
          <Col md={6} lg={3} className="mb-4" key={index}>
            <Card>
              <Card.Body className="d-flex align-items-center">
                <div 
                  className="rounded-circle me-3 d-flex align-items-center justify-content-center"
                  style={{ 
                    width: '50px', 
                    height: '50px', 
                    backgroundColor: stat.color,
                    color: stat.color === '#FEE800' ? '#000' : '#fff'
                  }}
                >
                  <i className={`${stat.icon} fs-4`}></i>
                </div>
                <div>
                  <h6 className="mb-0">{stat.title}</h6>
                  <h3 className="mb-0">{stat.value}</h3>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      
      <Row>
        <Col lg={8} className="mb-4">
          <Card>
            <Card.Header className="card-header-tgdd">
              Đơn hàng gần đây
            </Card.Header>
            <Card.Body>
              <p className="text-center text-muted py-5">Không có dữ liệu đơn hàng</p>
            </Card.Body>
          </Card>
        </Col>
        
        <Col lg={4} className="mb-4">
          <Card>
            <Card.Header className="card-header-tgdd">
              Thông báo hệ thống
            </Card.Header>
            <Card.Body>
              <p className="text-center text-muted py-5">Không có thông báo mới</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard; 