import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import '../assets/styles/loginpage.css';
import Header from '../components/Header';
import Footer from '../components/Footer';

const LoginPage = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState(''); // Trạng thái lưu mã OTP người dùng nhập
  const [generatedOtp, setGeneratedOtp] = useState(''); // Mã OTP được gửi
  const [error, setError] = useState('');
  const [otpSent, setOtpSent] = useState(false); // Trạng thái gửi OTP
  const navigate = useNavigate(); // Khởi tạo hook useNavigate

  const validPhoneNumbers = [
    { phoneNumber: '0987654321', name: 'Nguyen Van A' },
    { phoneNumber: '0912345678', name: 'Tran Thi B' },
    { phoneNumber: '0901234567', name: 'Le Van C' },
  ];

  // Hàm kiểm tra định dạng số điện thoại Việt Nam
  const validatePhoneNumber = (number) => {
    const PhoneRegex = /^(0|\+84)(3|5|7|8|9)\d{8}$/; 
    return PhoneRegex.test(number);
  };

  // Hàm xử lý gửi OTP
  const sendOtp = (number) => {
    const otpCode = Math.floor(100000 + Math.random() * 900000).toString(); // Tạo mã OTP ngẫu nhiên
    console.log(`Gửi OTP ${otpCode} đến số điện thoại: ${number}`);
    setGeneratedOtp(otpCode); // Lưu mã OTP đã gửi
    setOtpSent(true); // Đặt trạng thái OTP đã được gửi
    setError(''); // Xóa lỗi nếu có
  };

  const handleSubmit = () => {
    if (!phoneNumber) {
      setError('Vui lòng nhập số điện thoại');
    } else {
      const matchedEntry = validPhoneNumbers.find(
        (entry) => entry.phoneNumber === phoneNumber
      ); // Kiểm tra số điện thoại trong danh sách
      if (matchedEntry) {
        setError('');
        navigate('/lich-su-mua-hang'); // Chuyển hướng nếu hợp lệ
      } else if (validatePhoneNumber(phoneNumber)) {
        setError('');
        sendOtp(phoneNumber); // Gửi OTP nếu số điện thoại hợp lệ nhưng không có trong danh sách
      } else {
        setError('Số điện thoại không hợp lệ');
      }
    }
  };

  const handleVerifyOtp = () => {
    if (otp === generatedOtp) {
      setError('');
      alert('Xác minh OTP thành công!'); // Thay bằng logic xử lý tiếp theo
      navigate('/lich-su-mua-hang'); // Chuyển hướng sau khi xác minh thành công
    } else {
      setError('Mã OTP không chính xác');
    }
  };

  const handleResendOtp = () => {
    sendOtp(phoneNumber); // Gửi lại OTP
    setError('');
    alert('Mã OTP đã được gửi lại!');
  };

  const handleChangePhoneNumber = () => {
    setOtpSent(false); // Quay lại bước nhập số điện thoại
    setPhoneNumber('');
    setOtp('');
    setGeneratedOtp('');
    setError('');
  };

  return (
    <div className="login-page">
      <Header />
      <div className="main-content">
        <div className="illustration">
          <img src="../img/TGDD-540x270.png" alt="Illustration" />
        </div>
        <div className="login-form">
          <h2>Tra cứu thông tin đơn hàng</h2>
          {!otpSent ? (
            <>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Nhập số điện thoại mua hàng"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button className="continue-btn" onClick={handleSubmit}>
                TIẾP TỤC
              </button>
            </>
          ) : (
            <>
              <p className="success-message">
                Mã xác nhận đã được gửi qua tin nhắn của số điện thoại {phoneNumber}.
              </p>
              <div className="input-group">
                <input
                  type="text"
                  placeholder="Nhập mã OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              {error && <p className="error-message">{error}</p>}
              <button className="continue-btn" onClick={handleVerifyOtp}>
                XÁC MINH OTP
              </button>
              <p className="link" onClick={handleResendOtp}>
                Gửi lại mã xác nhận
              </p>
              <p className="link" onClick={handleChangePhoneNumber}>
                Đổi số điện thoại
              </p>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;