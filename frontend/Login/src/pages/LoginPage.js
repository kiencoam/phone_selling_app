import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import "../assets/styles/loginpage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios"; // Đảm bảo bạn đã cài axios: npm install axios

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Trạng thái loading khi đăng nhập
  const navigate = useNavigate();

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async () => {
    // Reset error message
    setError("");

    // Validate form
    if (!email) {
      setError("Vui lòng nhập email");
      return;
    }

    if (!validateEmail(email)) {
      setError("Email không hợp lệ");
      return;
    }

    if (!password) {
      setError("Vui lòng nhập mật khẩu");
      return;
    }

    try {
      setIsLoading(true); // Bắt đầu loading

      // Gọi API đăng nhập
      const response = await axios.post(
        "https://phone-selling-app-mw21.onrender.com/api/v1/auth/customer-login",
        {
          email,
          password,
        }
      );

      // Kiểm tra response theo cấu trúc API mới
      if (
        response.data &&
        response.data.meta &&
        response.data.meta.code === 200
      ) {
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.data.token);

        // Decode JWT token để lấy thông tin user (nếu cần)
        // const userInfo = decodeToken(response.data.data.token);
        // localStorage.setItem("user", JSON.stringify(userInfo));

        // Hiển thị thông báo đăng nhập thành công (tùy chọn)
        console.log("Đăng nhập thành công!");

        // Chuyển hướng đến trang chính
        navigate("/");
      } else {
        // Xử lý trường hợp API trả về code khác 200
        setError(response.data?.meta?.message || "Đăng nhập không thành công");
      }
    } catch (err) {
      // Xử lý lỗi từ API
      console.error("Login error:", err);

      if (err.response) {
        // Server trả về lỗi với status code
        const errorMessage = err.response.data?.meta?.message || 
                            err.response.data?.message || 
                            "Email hoặc mật khẩu không chính xác";
                            
        if (errorMessage.includes("User not found")) {
          setError("Không tìm thấy tài khoản với email này");
        } 
        else if (errorMessage.includes("Invalid credentials")) {
          setError("Mật khẩu không chính xác");
        }
        else if (errorMessage.includes("Invalid email")) {
          setError("Email không hợp lệ");
        }
        else if (errorMessage.includes("Account locked")) {
          setError("Tài khoản đã bị khóa. Vui lòng liên hệ hỗ trợ");
        }
        else {
          setError(errorMessage);
        }
      } else if (err.request) {
        // Không nhận được phản hồi từ server
        setError("Không thể kết nối đến máy chủ. Vui lòng thử lại sau.");
      } else {
        // Lỗi khi thiết lập request
        setError("Có lỗi xảy ra. Vui lòng thử lại.");
      }
    } finally {
      setIsLoading(false); // Kết thúc loading
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div className="login-page">
      <Header />
      <div className="main-content">
        <div className="illustration">
          <img src="../img/TGDD-540x270.png" alt="Illustration" />
        </div>
        <div className="login-form">
          <h2>Đăng nhập</h2>
          <div className="input-group">
            <label htmlFor="email">Email</label>
            <div className="input-with-icon">
              <input
                type="email"
                id="email"
                placeholder="Nhập email của bạn"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group password-group">
            <label htmlFor="password">Mật khẩu</label>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              placeholder="Nhập mật khẩu"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autocomplete="new-password"
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
          {error && <p className="error-message">{error}</p>}

          <div className="forgot-password">
            <span onClick={handleForgotPassword}>Quên mật khẩu?</span>
          </div>

          <button
            className={`login-btn ${isLoading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "ĐANG ĐĂNG NHẬP..." : "ĐĂNG NHẬP"}
          </button>

          <div className="register-link">
            <p>
              Bạn chưa có tài khoản? <span onClick={goToRegister}>Đăng ký</span>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default LoginPage;
