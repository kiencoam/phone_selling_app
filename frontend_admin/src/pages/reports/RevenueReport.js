import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Spinner, Alert, Badge } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import axios from 'axios';

// Đăng ký các thành phần Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const RevenueReport = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [averageOrderValue, setAverageOrderValue] = useState(0);
  const [orderCount, setOrderCount] = useState(0);

  // Lấy dữ liệu đơn hàng từ API
  const fetchOrders = async () => {
    setLoading(true);
    setError(null);
    try {
      // Lấy token từ localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Không tìm thấy token xác thực. Vui lòng đăng nhập lại.');
      }

      // Thiết lập tham số tìm kiếm
      const params = {
        page: 1,
        size: 50,
        status: 'RECEIVED'
      };

      // Thêm ngày bắt đầu và kết thúc nếu có
      if (startDate) {
        params.startDate = startDate.toISOString().split('T')[0];
      }
      if (endDate) {
        params.endDate = endDate.toISOString().split('T')[0];
      }

      // Gọi API
      const response = await axios.get('https://phone-selling-app-mw21.onrender.com/api/v1/order/staff/search', {
        params,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      // Xử lý dữ liệu phản hồi
      const data = response.data?.data?.content || [];
      setOrders(data);
      
      // Xử lý dữ liệu cho biểu đồ
      processChartData(data);
    } catch (error) {
      console.error('Lỗi khi lấy dữ liệu đơn hàng:', error);
      setError(error.message || 'Có lỗi xảy ra khi tải dữ liệu báo cáo doanh thu');
    } finally {
      setLoading(false);
    }
  };

  // Xử lý dữ liệu cho biểu đồ
  const processChartData = (data) => {
    if (!data || data.length === 0) {
      setChartData({
        labels: [],
        datasets: []
      });
      setTotalRevenue(0);
      setAverageOrderValue(0);
      setOrderCount(0);
      return;
    }

    // Nhóm dữ liệu theo ngày
    const revenueByDay = {};
    let total = 0;

    data.forEach(order => {
      // Lấy ngày từ createdAt
      const orderDate = new Date(order.createdAt);
      const dateKey = orderDate.toISOString().split('T')[0]; // Format: YYYY-MM-DD

      // Tính toán doanh thu theo ngày
      if (!revenueByDay[dateKey]) {
        revenueByDay[dateKey] = 0;
      }
      revenueByDay[dateKey] += order.totalPrice;
      total += order.totalPrice;
    });

    // Sắp xếp các ngày
    const sortedDates = Object.keys(revenueByDay).sort();

    // Định dạng nhãn hiển thị
    const formattedLabels = sortedDates.map(date => {
      const [year, month, day] = date.split('-');
      return `${day}/${month}/${year}`;
    });

    // Chuẩn bị dữ liệu cho biểu đồ
    const newChartData = {
      labels: formattedLabels,
      datasets: [
        {
          label: 'Doanh thu (VND)',
          data: sortedDates.map(date => revenueByDay[date]),
          borderColor: '#f96f3a',
          backgroundColor: 'rgba(249, 111, 58, 0.2)',
          fill: true,
          tension: 0.4
        }
      ]
    };

    setChartData(newChartData);
    setTotalRevenue(total);
    setOrderCount(data.length);
    setAverageOrderValue(data.length > 0 ? total / data.length : 0);
  };

  // Lấy dữ liệu khi component được mount
  useEffect(() => {
    fetchOrders();
  }, []);

  // Xử lý lọc theo ngày
  const handleFilter = () => {
    fetchOrders();
  };

  // Xóa bộ lọc
  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
    fetchOrders();
  };

  // Định dạng số thành tiền tệ
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  // Cấu hình hiển thị biểu đồ
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu theo ngày',
        font: {
          size: 16
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            let label = context.dataset.label || '';
            if (label) {
              label += ': ';
            }
            if (context.parsed.y !== null) {
              label += new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(context.parsed.y);
            }
            return label;
          }
        }
      }
    },
    scales: {
      y: {
        ticks: {
          callback: function(value) {
            return value.toLocaleString('vi-VN') + ' VND';
          }
        }
      }
    }
  };

  return (
    <Container fluid>
      <Row className="mb-4">
        <Col>
          <h2>Báo cáo doanh thu</h2>
        </Col>
      </Row>

      {error && (
        <Row className="mb-3">
          <Col>
            <Alert variant="danger">{error}</Alert>
          </Col>
        </Row>
      )}

      <Row className="mb-4">
        <Col>
          <Card>
            <Card.Header style={{ backgroundImage: 'linear-gradient(90deg, #f96f3a, #f96)', color: 'white' }}>
              <i className="bi bi-funnel me-2"></i>
              Bộ lọc dữ liệu
            </Card.Header>
            <Card.Body>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Từ ngày</Form.Label>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => setStartDate(date)}
                      selectsStart
                      startDate={startDate}
                      endDate={endDate}
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày bắt đầu"
                    />
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Label>Đến ngày</Form.Label>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => setEndDate(date)}
                      selectsEnd
                      startDate={startDate}
                      endDate={endDate}
                      minDate={startDate}
                      className="form-control"
                      dateFormat="dd/MM/yyyy"
                      placeholderText="Chọn ngày kết thúc"
                    />
                  </Form.Group>
                </Col>
                <Col md={4} className="d-flex align-items-end">
                  <Button variant="primary" onClick={handleFilter} className="me-2">
                    <i className="bi bi-search me-1"></i> Lọc dữ liệu
                  </Button>
                  <Button variant="secondary" onClick={clearFilters}>
                    <i className="bi bi-x-circle me-1"></i> Xóa bộ lọc
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mb-4">
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h3 className="text-primary">{formatCurrency(totalRevenue)}</h3>
              <p className="text-muted mb-0">Tổng doanh thu</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h3 className="text-success">{orderCount}</h3>
              <p className="text-muted mb-0">Số đơn hàng thành công</p>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="h-100">
            <Card.Body className="text-center">
              <h3 className="text-info">{formatCurrency(averageOrderValue)}</h3>
              <p className="text-muted mb-0">Giá trị đơn hàng trung bình</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        <Col>
          <Card>
            <Card.Body>
              {loading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" role="status" variant="primary">
                    <span className="visually-hidden">Đang tải...</span>
                  </Spinner>
                  <p className="mt-2">Đang tải dữ liệu báo cáo...</p>
                </div>
              ) : chartData.labels.length > 0 ? (
                <Line data={chartData} options={chartOptions} height={80} />
              ) : (
                <div className="text-center py-5">
                  <i className="bi bi-exclamation-circle text-warning" style={{ fontSize: '2rem' }}></i>
                  <p className="mt-2">Không có dữ liệu thỏa mãn điều kiện lọc</p>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default RevenueReport;
