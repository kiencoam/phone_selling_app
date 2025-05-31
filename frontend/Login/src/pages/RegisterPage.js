import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import { FaCheckCircle, FaExclamationTriangle } from "react-icons/fa";
import "../assets/styles/registerpage.css";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import axios from "axios";

const RegisterPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // State cho form đăng ký
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  
  // State xác minh email
  const [verifyStep, setVerifyStep] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  
  // UI state
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [isAlreadyLoggedIn, setIsAlreadyLoggedIn] = useState(false);

  // Kiểm tra đăng nhập và email đã xác minh
  useEffect(() => {
    // Kiểm tra đã đăng nhập chưa
    const checkLoginStatus = () => {
      const token = localStorage.getItem("token");
      if (token) {
        setIsAlreadyLoggedIn(true);
      } else {
        setIsAlreadyLoggedIn(false);
      }
    };

    checkLoginStatus();
    window.addEventListener("focus", checkLoginStatus);

    // Kiểm tra email đã xác minh
    const verifiedEmail = localStorage.getItem("verifiedEmail") || 
                         (location.state && location.state.verifiedEmail);
    if (verifiedEmail) {
      setFormData(prev => ({...prev, email: verifiedEmail}));
      setEmailVerified(true);
      setVerifyStep(false); // Chuyển thẳng qua bước đăng ký
    } else {
      setVerifyStep(true); // Hiển thị form xác minh email trước
    }

    return () => {
      window.removeEventListener("focus", checkLoginStatus);
    };
  }, [location]);

  // Validate email và password
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{8,}$/;
    return passwordRegex.test(password);
  };

  // Xử lý thay đổi input
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Gửi email xác minh
  const handleSendVerification = async () => {
    setError("");

    if (!formData.email) {
      setError("Vui lòng nhập email");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Email không hợp lệ");
      return;
    }

    try {
      setIsLoading(true);

      // Gọi API gửi email xác minh
      const response = await axios.post(
        "http://localhost:4000/auth/send-verification",
        { email: formData.email }
      );

      if (response.data?.meta?.code === 200) {
        setEmailSent(true);
        setSuccessMessage("Email xác minh đã được gửi. Vui lòng kiểm tra hộp thư của bạn.");
      } else {
        setError(response.data?.meta?.message || "Không thể gửi email xác minh");
      }
    } catch (err) {
      console.error("Verification error:", err);

      if (err.response) {
        setError(err.response.data?.meta?.message || "Lỗi khi gửi email xác minh");
      } else if (err.request) {
        setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Đăng ký tài khoản
  const handleRegister = async () => {
    setError("");

    if (!formData.fullName) {
      setError("Vui lòng nhập họ tên");
      return;
    }

    if (!formData.password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }

    if (!validatePassword(formData.password)) {
      setError(
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số."
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(
        "https://phone-selling-app-mw21.onrender.com/api/v1/auth/customer-register",
        {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        }
      );

      if (
        response.data &&
        response.data.meta &&
        response.data.meta.code === 200
      ) {
        // Xóa email đã xác minh khỏi localStorage
        localStorage.removeItem("verifiedEmail");
        
        setSuccessMessage(
          "Đăng ký thành công! Bạn sẽ được chuyển đến trang đăng nhập sau 3 giây."
        );
        
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } else {
        setError(response.data?.meta?.message || "Đăng ký không thành công");
      }
    } catch (err) {
      console.error("Register error:", err);

      if (err.response) {
        const errorMessage =
          err.response.data?.meta?.message ||
          err.response.data?.message ||
          "Đăng ký không thành công";

        if (errorMessage.includes("Email already exists")) {
          setError("Email này đã được sử dụng");
        } else if (errorMessage.includes("Invalid email")) {
          setError("Email không hợp lệ");
        } else {
          setError(errorMessage);
        }
      } else if (err.request) {
        setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      } else {
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle hiển thị password
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const goToLogin = () => {
    navigate("/login");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    setIsAlreadyLoggedIn(false);

    console.log("Đã đăng xuất, token đã bị xóa");
  };

  const goToHome = () => {
    navigate("/");
  };

  // Nếu đã đăng nhập
  if (isAlreadyLoggedIn) {
    return (
      <div className="register-page">
        <Header />
        <div className="main-content">
          <div className="register-form">
            <h2>Bạn đã đăng nhập</h2>
            <p>Bạn đã đăng nhập vào hệ thống.</p>
            <div className="button-group">
              <button className="primary-btn" onClick={goToHome}>
                Về trang chủ
              </button>
              <button className="secondary-btn" onClick={handleLogout}>
                Đăng xuất
              </button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Form xác minh email
  if (verifyStep && !emailVerified) {
    return (
      <div className="register-page">
        <Header />
        <div className="main-content">
          <div className="illustration">
            <img src="../img/TGDD-540x270.png" alt="Illustration" />
          </div>
          <div className="register-form">
            <h2>Đăng ký tài khoản</h2>
            
            {emailSent ? (
              <div className="verification-sent">
                <div className="success-icon">
                  <FaCheckCircle />
                </div>
                <h3>Kiểm tra email của bạn!</h3>
                <p>Chúng tôi đã gửi một email xác minh đến <strong>{formData.email}</strong></p>
                <p>Vui lòng kiểm tra hộp thư đến và thư mục spam để hoàn tất quá trình xác minh.</p>
                <p className="note">
                  Sau khi xác minh email, bạn sẽ được chuyển đến bước tiếp theo của quá trình đăng ký.
                </p>
                <div className="button-group">
                  <button className="back-btn" onClick={() => setEmailSent(false)}>
                    Thử lại
                  </button>
                  <button className="login-btn" onClick={goToLogin}>
                    Đăng nhập
                  </button>
                </div>
              </div>
            ) : (
              <>
                <div className="input-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
                
                {error && <p className="error-message">{error}</p>}
                {successMessage && (
                  <div className="success-message">
                    <FaCheckCircle />
                    <span>{successMessage}</span>
                  </div>
                )}
                
                <button
                  className={`register-btn ${isLoading ? "loading" : ""}`}
                  onClick={handleSendVerification}
                  disabled={isLoading || successMessage}
                >
                  {isLoading ? "ĐANG GỬI..." : "XÁC MINH EMAIL"}
                </button>
                
                <div className="login-link">
                  <p>
                    Đã có tài khoản? <span onClick={goToLogin}>Đăng nhập</span>
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Form đăng ký đầy đủ (sau khi xác minh email)
  return (
    <div className="register-page">
      <Header />
      <div className="main-content">
        <div className="illustration">
          <img src="../img/TGDD-540x270.png" alt="Illustration" />
        </div>
        <div className="register-form">
          <h2>Đăng ký</h2>
          
          <div className="input-group">
            <label htmlFor="email">
              Email {emailVerified && <span className="verified-badge">Đã xác minh</span>}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Nhập email của bạn"
              value={formData.email}
              onChange={handleInputChange}
              disabled={emailVerified}
              className={emailVerified ? "verified-input" : ""}
            />
          </div>

          <div className="input-group">
            <label htmlFor="fullName">Họ và tên</label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Nhập họ và tên của bạn"
              value={formData.fullName}
              onChange={handleInputChange}
            />
          </div>

          <div className="input-group password-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              value={formData.password}
              onChange={handleInputChange}
              autoComplete="new-password"
              data-lpignore="true"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleShowPassword}
              aria-label={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showPassword ? (
                <MdOutlineVisibilityOff />
              ) : (
                <MdOutlineVisibility />
              )}
            </button>
          </div>

          <div className="input-group password-group">
            <label htmlFor="confirmPassword">Xác nhận mật khẩu</label>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Nhập lại mật khẩu"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              autoComplete="new-password"
              data-lpignore="true"
            />
            <button
              type="button"
              className="toggle-password"
              onClick={toggleShowConfirmPassword}
              aria-label={showConfirmPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
            >
              {showConfirmPassword ? (
                <MdOutlineVisibilityOff />
              ) : (
                <MdOutlineVisibility />
              )}
            </button>
          </div>

          {error && <p className="error-message">{error}</p>}
          {successMessage && (
            <div className="success-message">
              <FaCheckCircle />
              <span>{successMessage}</span>
            </div>
          )}

          <button
            className={`register-btn ${isLoading ? "loading" : ""}`}
            onClick={handleRegister}
            disabled={isLoading || successMessage}
          >
            {isLoading ? "ĐANG ĐĂNG KÝ..." : "ĐĂNG KÝ"}
          </button>

          <div className="login-link">
            <p>
              Đã có tài khoản? <span onClick={goToLogin}>Đăng nhập</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default RegisterPage;