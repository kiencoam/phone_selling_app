import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaExclamationTriangle, FaSpinner } from "react-icons/fa";
import axios from "axios";
import "../assets/styles/emailverification.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const EmailVerificationPage = () => {
  const { token } = useParams();
  const navigate = useNavigate();
  
  const [isLoading, setIsLoading] = useState(true);
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [error, setError] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);

  useEffect(() => {
    // Hàm xác minh email khi component được render
    const verifyEmail = async () => {
      if (!token) {
        setError("Token xác minh không hợp lệ");
        setIsLoading(false);
        return;
      }

      try {
        // Gọi API xác minh email
        const verifyResponse = await axios.post(
          "http://localhost:4000/auth/verify-email", 
          { token }
        );

        if (verifyResponse.data?.meta?.code === 200) {
          // Xác minh thành công, lấy email đã xác minh
          const email = verifyResponse.data.data.email;
          setVerifiedEmail(email);
          
          // Lưu email đã xác minh vào localStorage để sử dụng sau này
          localStorage.setItem("verifiedEmail", email);
          
          // Đăng ký tự động với BE1 nếu muốn
          // await registerToBE1(email);
        } else {
          setError(verifyResponse.data?.meta?.message || "Không thể xác minh email");
        }
      } catch (err) {
        console.error("Email verification error:", err);
        
        if (err.response) {
          setError(err.response.data?.meta?.message || "Xác minh email không thành công");
        } else if (err.request) {
          setError("Không thể kết nối đến máy chủ xác minh. Vui lòng thử lại sau.");
        } else {
          setError("Có lỗi xảy ra khi xác minh email");
        }
      } finally {
        setIsLoading(false);
      }
    };

    verifyEmail();
  }, [token]);

  // Hàm đăng ký với BE1
  const registerToBE1 = async () => {
    try {
      setIsRegistering(true);

      // Chuyển hướng đến trang đăng ký với email đã xác minh
      navigate("/register", { state: { verifiedEmail } });
    } catch (error) {
      console.error("Navigation error:", error);
      setError("Không thể tiếp tục quá trình đăng ký");
    } finally {
      setIsRegistering(false);
    }
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const goToRegister = () => {
    navigate("/register", { state: { verifiedEmail } });
  };

  // Hiển thị đang tải
  if (isLoading) {
    return (
      <div className="email-verification-page">
        <Header />
        <div className="main-content">
          <div className="verification-container">
            <div className="loading-state">
              <FaSpinner className="spinner" />
              <p>Đang xác minh email của bạn...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Hiển thị khi đang đăng ký
  if (isRegistering) {
    return (
      <div className="email-verification-page">
        <Header />
        <div className="main-content">
          <div className="verification-container">
            <div className="loading-state">
              <FaSpinner className="spinner" />
              <p>Đang chuẩn bị trang đăng ký...</p>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Hiển thị xác minh thành công
  if (verifiedEmail) {
    return (
      <div className="email-verification-page">
        <Header />
        <div className="main-content">
          <div className="verification-container">
            <div className="success-state">
              <div className="success-icon">
                <FaCheckCircle />
              </div>
              <h2>Xác minh email thành công!</h2>
              <p>
                Email <strong>{verifiedEmail}</strong> đã được xác minh thành công.
              </p>
              <p>Vui lòng tiếp tục quá trình đăng ký để hoàn tất tài khoản của bạn.</p>
              
              <div className="button-group">
                <button className="register-btn" onClick={goToRegister}>
                  Tiếp tục đăng ký
                </button>
                <button className="login-btn" onClick={goToLogin}>
                  Đăng nhập
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Hiển thị xác minh thất bại
  return (
    <div className="email-verification-page">
      <Header />
      <div className="main-content">
        <div className="verification-container">
          <div className="error-state">
            <div className="error-icon">
              <FaExclamationTriangle />
            </div>
            <h2>Xác minh email không thành công</h2>
            <p className="error-message">{error}</p>
            <p className="suggestion">
              Link xác minh có thể đã hết hạn hoặc không hợp lệ.
            </p>
            <button className="register-btn" onClick={() => navigate("/register")}>
              Thử lại
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default EmailVerificationPage;