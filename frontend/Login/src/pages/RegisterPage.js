import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdOutlineVisibility, MdOutlineVisibilityOff } from "react-icons/md";
import "../assets/styles/registerpage.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import axios from "axios";

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Hàm kiểm tra định dạng email
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Hàm kiểm tra mật khẩu mạnh
  const validatePassword = (password) => {
    // Ít nhất 8 ký tự, có chữ hoa, chữ thường, số và ký tự đặc biệt
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async () => {
    // Reset error message
    setError("");

    // Validate form
    if (!formData.email) {
      setError("Vui lòng nhập email");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Email không hợp lệ");
      return;
    }

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
        "Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường và số"
      );
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Mật khẩu xác nhận không khớp");
      return;
    }

    try {
      setIsLoading(true);

      // Gọi API đăng ký
      const response = await axios.post(
        "https://phone-selling-app-mw21.onrender.com/api/v1/auth/customer-register",
        {
          email: formData.email,
          password: formData.password,
          fullName: formData.fullName,
        }
      );

      // Kiểm tra response
      if (
        response.data &&
        response.data.meta &&
        response.data.meta.code === 200
      ) {
        // Lưu token vào localStorage
        localStorage.setItem("token", response.data.data.token);

        // Hiển thị thông báo đăng ký thành công
        console.log("Đăng ký thành công!");

        // Chuyển hướng đến trang chính
        navigate("/");
      } else {
        // Xử lý trường hợp API trả về code khác 200
        setError(response.data?.meta?.message || "Đăng ký không thành công");
      }
    } catch (err) {
      // Xử lý lỗi từ API
      console.error("Register error:", err);

      if (err.response) {
        // Server trả về lỗi với status code
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

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const goToLogin = () => {
    navigate("/login");
  };

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

          <button
            className={`register-btn ${isLoading ? "loading" : ""}`}
            onClick={handleSubmit}
            disabled={isLoading}
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
