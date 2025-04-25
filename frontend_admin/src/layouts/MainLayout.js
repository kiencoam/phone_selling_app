import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const MainLayout = () => {
  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col md={3} lg={2} className="d-md-block d-none">
          <Sidebar />
        </Col>
        <Col md={9} lg={10}>
          <main className="main-content">
            <Outlet />
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default MainLayout; 