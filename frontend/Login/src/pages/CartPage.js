import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../assets/styles/CartPage.css";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaAngleRight,
  FaTimes,
  FaPen,
  FaPlus,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { IoStorefront } from "react-icons/io5";

const CartPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const [deliveryMethod, setDeliveryMethod] = useState("delivery");
  const [modalDeliveryMethod, setModalDeliveryMethod] = useState("delivery");

  const [invoiceData, setInvoiceData] = useState({
    companyName: "",
    companyAddress: "",
    taxCode: "",
    email: "",
  });

  // Thêm state để theo dõi các option đặc biệt
  const [specialRequests, setSpecialRequests] = useState({
    instruction: false,
    invoice: false,
    other: false,
  });

  // Hàm xử lý thay đổi checkbox yêu cầu đặc biệt
  const handleSpecialRequestChange = (e) => {
    const { name, checked } = e.target;
    setSpecialRequests({
      ...specialRequests,
      [name]: checked,
    });
  };

  const handleInvoiceInputChange = (e) => {
    const { name, value } = e.target;
    setInvoiceData({
      ...invoiceData,
      [name]: value,
    });
  };

  // Danh sách các địa chỉ người dùng
  const [addresses, setAddresses] = useState([]);
  const [loadingAddresses, setLoadingAddresses] = useState(true);
  const [addressError, setAddressError] = useState(null);

  const fetchAddresses = async () => {
    try {
      setLoadingAddresses(true);

      // Kiểm tra token ngay từ đầu
      const token = localStorage.getItem("token");

      if (!token) {
        // Nếu không có token, không cần gọi API
        console.log("Người dùng chưa đăng nhập, bỏ qua việc tải địa chỉ");
        setLoadingAddresses(false);
        setAddressError("Vui lòng đăng nhập để xem địa chỉ giao hàng");
        return;
      }

      // Gọi API lấy địa chỉ giao hàng
      const response = await axios.get(
        "https://phone-selling-app-mw21.onrender.com/api/v1/user/shipping-info",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kiểm tra response
      if (
        response.data &&
        response.data.data &&
        response.data.data.length > 0
      ) {
        console.log("Shipping addresses:", response.data.data);

        // Cập nhật danh sách địa chỉ
        const addressesData = response.data.data;
        setAddresses(addressesData);

        // Chọn địa chỉ mặc định (hoặc địa chỉ đầu tiên)
        const defaultAddress =
          addressesData.find((addr) => addr.isDefault) || addressesData[0];
        setSelectedAddress(defaultAddress);
        setSelectedAddressId(defaultAddress.id);

        setAddressError(null);
      } else {
        // Không có địa chỉ giao hàng
        setAddressError("Chưa có địa chỉ giao hàng nào");
        setAddresses([]);
      }
    } catch (err) {
      console.error("Lỗi khi lấy địa chỉ giao hàng:", err);

      if (err.response && err.response.status === 401) {
        setAddressError("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
      } else {
        setAddressError("Không thể tải địa chỉ giao hàng");
      }
    } finally {
      setLoadingAddresses(false);
    }
  };

  // Địa chỉ hiện tại được chọn
  const [selectedAddress, setSelectedAddress] = useState({
    receiveName: "",
    phone: "",
    address: "",
  });
  const [selectedAddressId, setSelectedAddressId] = useState(
    selectedAddress?.id || null
  );

  // State cho modal
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    gender: "Chị", // "Anh" hoặc "Chị"
    name: "",
    phone: "",
    address: "",
    isDefault: false,
  });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  // Products, calculations and other functions as before
  const [products, setProducts] = useState([]);

  const fetchCart = async () => {
    try {
      setLoading(true);

      // Lấy token từ localStorage
      const token = localStorage.getItem("token");

      if (!token) {
        console.log("Người dùng chưa đăng nhập");
        // Thay vì hiển thị lỗi, có thể chuyển hướng người dùng đến trang đăng nhập
        // navigate('/login');
        setLoading(false);
        return;
      }

      // Gọi API giỏ hàng với token
      const response = await axios.get(
        "https://phone-selling-app-mw21.onrender.com/api/v1/user/cart",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Kiểm tra response
      if (response.data && response.data.data) {
        console.log("Cart data:", response.data.data);

        // Cập nhật state products với dữ liệu từ API
        setProducts(response.data.data);
        setError(null);
      } else {
        // Xử lý khi không có dữ liệu
        setError("Không tìm thấy sản phẩm trong giỏ hàng");
        setProducts([]);
      }
    } catch (err) {
      console.error("Lỗi khi lấy giỏ hàng:", err);

      if (err.response && err.response.status === 401) {
        // Token hết hạn hoặc không hợp lệ
        localStorage.removeItem("token"); // Xóa token không hợp lệ
        setError("Phiên đăng nhập đã hết hạn, vui lòng đăng nhập lại");
        // navigate('/login'); // Có thể chuyển hướng người dùng đến trang đăng nhập
      } else {
        setError("Không thể tải giỏ hàng. Vui lòng thử lại sau.");
      }

      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Chỉ gọi API nếu đã đăng nhập
      fetchCart();
      fetchAddresses();
    } else {
      // Nếu chưa đăng nhập, không gọi API và kết thúc loading
      setLoading(false);
      setLoadingAddresses(false);
      console.log("Người dùng chưa đăng nhập, bỏ qua việc gọi API");
    }
  }, []);

  // Calculate totals
  const totalItems = products.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const subTotal = products.reduce(
    (sum, product) => sum + product.catalogItem.price * product.quantity,
    0
  );

  const totalDiscount = products.reduce(
    (sum, product) =>
      sum +
      (product.catalogItem.basePrice - product.catalogItem.price) *
        product.quantity,
    0
  );

  const updateQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;

    try {
      // Cập nhật UI trước (optimistic update)
      setProducts(
        products.map((product) =>
          product.id === id ? { ...product, quantity: newQuantity } : product
        )
      );

      // Lấy token từ localStorage
      const token = localStorage.getItem("token");
      if (!token) return;

      // Gọi API để cập nhật số lượng
      await axios.put(
        `https://phone-selling-app-mw21.onrender.com/api/v1/user/cart/update/${id}`,
        { quantity: newQuantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
    } catch (err) {
      console.error("Lỗi khi cập nhật số lượng sản phẩm:", err);
      alert("Không thể cập nhật số lượng. Vui lòng thử lại.");

      // Rollback UI state nếu API thất bại
      fetchCart(); // Gọi lại hàm fetchCart để lấy dữ liệu mới nhất
    }
  };

  const removeProduct = (id) => {
    setProducts(products.filter((product) => product.id !== id));
  };

  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".") + "đ";
  };

  // Xử lý form địa chỉ
  const handleAddressFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    console.log("Form change:", name, value, type, checked);
    setAddressForm({
      ...addressForm,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const openAddressModal = () => {
    setModalDeliveryMethod("delivery");
    setShowAddressForm(false);
    setShowAddressModal(true);
    setSelectedAddressId(selectedAddress?.id);
  };

  const handleEditAddress = (address) => {
    const nameParts = address.receiveName.split(" ");
    const gender = nameParts[0];
    const name = nameParts.slice(1).join(" ");

    setAddressForm({
      gender,
      name: name,
      phone: address.phone,
      address: address.address,
      isDefault: address.isDefault,
    });
    setEditMode(true);
    setEditId(address.id);
    setShowAddressForm(true);
  };

  const handleNewAddress = () => {
    setAddressForm({
      gender: "Chị",
      name: "",
      phone: "",
      address: "",
      isDefault: false,
    });
    setEditMode(false);
    setShowAddressForm(true);
  };

  const handleUserInfoChange = (field, value) => {
    if (field === "gender") {
      const currentName =
        selectedAddress?.receiveName?.split(" ").slice(1).join(" ") || "";
      const newReceiveName = `${value} ${currentName}`;
      setSelectedAddress({ ...selectedAddress, receiveName: newReceiveName });
    } else if (field === "name") {
      const currentGender =
        selectedAddress?.receiveName?.split(" ")[0] || "Chị";
      const newReceiveName = `${currentGender} ${value}`;
      setSelectedAddress({ ...selectedAddress, receiveName: newReceiveName });
    } else if (field === "phone") {
      setSelectedAddress({ ...selectedAddress, phone: value });
    }
  };

  const selectAddress = (addressId) => {
    setSelectedAddressId(addressId);
    // Tìm và cập nhật selectedAddress khi chọn địa chỉ mới
    const newSelectedAddress = addresses.find((addr) => addr.id === addressId);
    if (newSelectedAddress) {
      // setSelectedAddress(newSelectedAddress); // Có thể uncomment nếu muốn cập nhật ngay
      // Hoặc giữ nguyên để chỉ cập nhật khi nhấn "Xác nhận"
    }
  };

  const handleAddressSave = () => {
    const { gender, name, phone, address, isDefault } = addressForm;

    // Validate form
    if (!name || !phone || !address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (editMode) {
      // Cập nhật địa chỉ hiện có
      const updatedAddresses = addresses.map((addr) => {
        if (addr.id === editId) {
          const updatedAddr = {
            ...addr,
            receiveName: `${gender} ${name}`,
            phone,
            address,
            isDefault,
          };

          return updatedAddr;
        }
        // Nếu địa chỉ này được thiết lập làm mặc định, thì các địa chỉ khác sẽ không còn là mặc định nữa
        if (isDefault && addr.id !== editId) {
          return { ...addr, isDefault: false };
        }
        return addr;
      });

      setAddresses(updatedAddresses);
      setSelectedAddressId(editId);
      setShowAddressForm(false);
    } else {
      // Tạo địa chỉ mới
      const newAddress = {
        id: Date.now(), // ID tạm thời
        receiveName: `${gender} ${name}`,
        phone,
        address,
        isDefault,
      };

      let newAddresses;
      if (isDefault) {
        // Nếu là địa chỉ mặc định, cập nhật các địa chỉ khác
        newAddresses = addresses.map((addr) => ({
          ...addr,
          isDefault: false,
        }));
        newAddresses.push(newAddress);
      } else {
        newAddresses = [...addresses, newAddress];
      }

      setAddresses(newAddresses);
      setSelectedAddressId(newAddress.id);
      setShowAddressForm(false);
    }
  };

  const confirmAddressSelection = () => {
    const selectedAddr = addresses.find(
      (addr) => addr.id === selectedAddressId
    );
    if (selectedAddr) {
      // Cập nhật thông tin từ selectedAddr, nhưng giữ lại các thay đổi đã thực hiện
      // cho người đặt (tên và số điện thoại) từ selectedAddress
      const updatedAddress = {
        ...selectedAddr,
        receiveName: selectedAddress.receiveName, // Giữ lại tên đã chỉnh sửa
        phone: selectedAddress.phone, // Giữ lại SĐT đã chỉnh sửa
      };

      // Cập nhật selectedAddress với thông tin đã kết hợp
      setSelectedAddress(updatedAddress);

      // Cập nhật lại danh sách addresses để lưu các thay đổi
      const updatedAddresses = addresses.map((addr) =>
        addr.id === selectedAddressId ? updatedAddress : addr
      );
      setAddresses(updatedAddresses);
    }
    setShowAddressModal(false);
  };

  return (
    <div className="cart-page">
      <Header />
      <div className="container">
        {/* Modal thay đổi địa chỉ - Theo đúng ảnh mẫu */}
        {showAddressModal && (
          <div className="modal-overlay">
            <div className="address-modal">
              <div className="modal-header">
                <h3>Thông tin giao hàng</h3>
                <button
                  className="modal-close"
                  onClick={() => setShowAddressModal(false)}
                >
                  <FaTimes />
                </button>
              </div>

              {!showAddressForm ? (
                <div className="modal-body">
                  <div className="modal-section user-info-section">
                    <h4>Thông tin người đặt</h4>
                    <div className="gender-selection">
                      <label className="radio-label">
                        <input
                          type="radio"
                          checked={selectedAddress?.receiveName?.includes(
                            "Anh"
                          )}
                          onChange={() => handleUserInfoChange("gender", "Anh")}
                        />
                        <span>Anh</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          checked={selectedAddress?.receiveName?.includes(
                            "Chị"
                          )}
                          onChange={() => handleUserInfoChange("gender", "Chị")}
                        />
                        <span>Chị</span>
                      </label>
                    </div>

                    <div className="info-fields">
                      <div className="info-field">
                        <label>Họ và Tên</label>
                        <input
                          type="text"
                          value={
                            selectedAddress?.receiveName
                              ?.split(" ")
                              .slice(1)
                              .join(" ") || ""
                          }
                          onChange={(e) =>
                            handleUserInfoChange("name", e.target.value)
                          }
                        />
                      </div>

                      <div className="info-field">
                        <label>Số điện thoại</label>
                        <input
                          type="text"
                          value={selectedAddress?.phone || ""}
                          onChange={(e) =>
                            handleUserInfoChange("phone", e.target.value)
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="modal-section">
                    <h4>Chọn hình thức giao hàng</h4>
                    <div className="delivery-method-tabs">
                      <div
                        className={`delivery-method-tab ${
                          modalDeliveryMethod === "delivery" ? "active" : ""
                        }`}
                        onClick={() => setModalDeliveryMethod("delivery")}
                      >
                        <TbTruckDelivery className="tab-icon" />
                        <span>Giao tận nơi</span>
                      </div>
                      <div
                        className={`delivery-method-tab ${
                          modalDeliveryMethod === "pickup" ? "active" : ""
                        }`}
                        onClick={() => setModalDeliveryMethod("pickup")}
                      >
                        <IoStorefront className="tab-icon" />
                        <span>Nhận tại siêu thị</span>
                      </div>
                    </div>
                  </div>

                  {modalDeliveryMethod === "delivery" && (
                    <div className="modal-section addresses-section">
                      {addresses.map((address) => (
                        <div
                          key={address.id}
                          className={`address-item ${
                            selectedAddressId === address.id ? "selected" : ""
                          }`}
                          onClick={() => selectAddress(address.id)}
                        >
                          <div className="address-selector">
                            <input
                              type="radio"
                              checked={selectedAddressId === address.id}
                              readOnly
                            />
                          </div>
                          <div className="address-content">
                            <div className="address-text">
                              {address.address}
                            </div>
                            {address.isDefault && (
                              <span className="default-badge">Mặc định</span>
                            )}
                          </div>
                          <div className="address-actions">
                            <button
                              className="edit-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleEditAddress(address);
                              }}
                            >
                              <FaPen /> Chỉnh sửa
                            </button>
                          </div>
                        </div>
                      ))}

                      <button
                        className="add-address-btn"
                        onClick={handleNewAddress}
                      >
                        <FaPlus /> Thêm thông tin địa chỉ giao hàng mới
                      </button>
                    </div>
                  )}

                  {modalDeliveryMethod === "pickup" && (
                    <div className="modal-section store-section">
                      <div className="store-search">
                        <input
                          type="text"
                          placeholder="Nhập tên đường, quận, huyện để tìm kiếm siêu thị"
                          className="store-search-input"
                        />
                      </div>
                      <div className="store-list">
                        <p>Vui lòng nhập địa chỉ để tìm cửa hàng gần nhất</p>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Form thêm/chỉnh sửa địa chỉ
                <div className="modal-body">
                  <div className="modal-section">
                    <div className="form-group gender-group">
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="Anh"
                          checked={addressForm.gender === "Anh"}
                          onChange={handleAddressFormChange}
                        />
                        <span>Anh</span>
                      </label>
                      <label className="radio-label">
                        <input
                          type="radio"
                          name="gender"
                          value="Chị"
                          checked={addressForm.gender === "Chị"}
                          onChange={handleAddressFormChange}
                        />
                        <span>Chị</span>
                      </label>
                    </div>

                    <div className="form-group">
                      <label>Họ và Tên</label>
                      <input
                        type="text"
                        name="name"
                        placeholder="Họ và Tên"
                        value={addressForm.name}
                        onChange={handleAddressFormChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Số điện thoại</label>
                      <input
                        type="text"
                        name="phone"
                        placeholder="Số điện thoại"
                        value={addressForm.phone}
                        onChange={handleAddressFormChange}
                      />
                    </div>
                  </div>

                  <div className="modal-section">
                    <div className="address-field">
                      <label>
                        <FaMapMarkerAlt className="location-icon" />
                        <span>
                          {editMode ? "Địa chỉ hiện tại" : "Thêm địa chỉ mới"}
                        </span>
                      </label>
                      <textarea
                        name="address"
                        placeholder="Nhập địa chỉ giao hàng"
                        value={addressForm.address}
                        onChange={handleAddressFormChange}
                      ></textarea>
                    </div>

                    <label className="default-address">
                      <input
                        type="checkbox"
                        name="isDefault"
                        checked={addressForm.isDefault}
                        onChange={handleAddressFormChange}
                      />
                      <span>Đặt làm địa chỉ mặc định</span>
                    </label>
                  </div>

                  <div className="form-actions">
                    <button
                      className="cancel-btn"
                      onClick={() => setShowAddressForm(false)}
                    >
                      Hủy
                    </button>
                    <button className="save-btn" onClick={handleAddressSave}>
                      Lưu
                    </button>
                  </div>
                </div>
              )}

              {!showAddressForm && (
                <div className="modal-footer">
                  <button
                    className="modal-btn confirm-btn"
                    onClick={confirmAddressSelection}
                  >
                    Xác Nhận
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {!localStorage.getItem("token") ? (
          // Hiển thị thông báo đăng nhập
          <div className="login-required-container">
            <div className="login-required-content">
              <img
                src="https://cdn-icons-png.flaticon.com/512/6357/6357599.png"
                alt="Yêu cầu đăng nhập"
                className="login-required-image"
              />
              <h2 className="login-required-title">Vui lòng đăng nhập</h2>
              <p className="login-required-message">
                Bạn cần đăng nhập để xem giỏ hàng và thông tin giao hàng
              </p>
              <div className="login-required-buttons">
                <button
                  className="login-button"
                  onClick={() => navigate("/login")}
                >
                  Đăng nhập
                </button>
                <button className="home-button" onClick={() => navigate("/")}>
                  Về trang chủ
                </button>
              </div>
              <div className="customer-support">
                <p>
                  Khi cần trợ giúp vui lòng gọi{" "}
                  <span className="support-phone">1900 232 460</span> hoặc{" "}
                  <span className="support-phone">028.3622.1060</span>{" "}
                  <span className="support-time">(8h00 - 21h30)</span>
                </p>
              </div>
            </div>
          </div>
        ) : loading ? (
          // Hiển thị loading khi đang tải giỏ hàng
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Đang tải giỏ hàng...</p>
          </div>
        ) : error ? (
          // Hiển thị lỗi nếu có
          <div className="error-container">
            <p className="error-message">{error}</p>
          </div>
        ) : (
          <>
            {/* Delivery Options */}
            <div className="delivery-options">
              <label
                className={`delivery-tab ${
                  deliveryMethod === "delivery" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "delivery"}
                  onChange={() => setDeliveryMethod("delivery")}
                />
                <span className="tab-label">Giao tận nơi</span>
              </label>
              <label
                className={`delivery-tab ${
                  deliveryMethod === "pickup" ? "active" : ""
                }`}
              >
                <input
                  type="radio"
                  name="delivery"
                  checked={deliveryMethod === "pickup"}
                  onChange={() => setDeliveryMethod("pickup")}
                />
                <span className="tab-label">Nhận tại siêu thị</span>
              </label>
            </div>
            {/* Recipient Info */}
            {deliveryMethod === "delivery" && (
              <div className="recipient-info">
                {loadingAddresses ? (
                  <div className="loading-addresses">
                    <div className="loading-spinner small"></div>
                    <span>Đang tải địa chỉ...</span>
                  </div>
                ) : addressError ? (
                  <div className="address-error">
                    <span className="error-message">{addressError}</span>
                  </div>
                ) : addresses.length > 0 ? (
                  <>
                    <div className="recipient-header">
                      <span className="recipient-name">
                        Người nhận:{" "}
                        {selectedAddress?.receiveName || "Chưa có tên"} -{" "}
                        {selectedAddress?.phone || "Chưa có số điện thoại"}
                      </span>
                      <button
                        className="recipient-edit"
                        onClick={openAddressModal}
                      >
                        <FaAngleRight />
                      </button>
                    </div>
                    <div className="recipient-address">
                      <FaMapMarkerAlt className="location-icon" />
                      <span>
                        {selectedAddress?.address || "Chưa có địa chỉ"}
                      </span>
                    </div>
                  </>
                ) : (
                  <div className="no-address">
                    <span>Bạn chưa có địa chỉ giao hàng</span>
                    <button
                      className="add-address-button"
                      onClick={handleNewAddress}
                    >
                      <FaPlus /> Thêm địa chỉ mới
                    </button>
                  </div>
                )}
              </div>
            )}
            {/* Products List */}
            <div className="products-list">
              {products.length > 0 ? (
                products.map((product) => (
                  <CartItem
                    key={product.id}
                    product={product}
                    updateQuantity={updateQuantity}
                    removeProduct={removeProduct}
                    formatPrice={formatPrice}
                  />
                ))
              ) : (
                <div className="empty-cart-container">
                  <div className="empty-cart-content">
                    <img
                      src="https://cdn.tgdd.vn/mwgcart/v2/vue-pro/img/empty-cart.f6c223c07c1d3d8f81d326a2a.png"
                      alt="Giỏ hàng trống"
                      className="empty-cart-image"
                    />
                    <h2 className="empty-cart-title">Giỏ hàng trống</h2>
                    <p className="empty-cart-message">
                      {!localStorage.getItem("token")
                        ? "Vui lòng đăng nhập để xem giỏ hàng của bạn"
                        : "Không có sản phẩm nào trong giỏ hàng"}
                    </p>
                    <div className="empty-cart-buttons">
                      <button
                        className="home-button"
                        onClick={() => navigate("/")}
                      >
                        Về trang chủ
                      </button>
                      {!localStorage.getItem("token") && (
                        <button
                          className="login-button"
                          onClick={() => navigate("/login")}
                        >
                          Đăng nhập
                        </button>
                      )}
                    </div>
                    <div className="customer-support">
                      <p>
                        Khi cần trợ giúp vui lòng gọi{" "}
                        <span className="support-phone">1900 232 460</span> hoặc{" "}
                        <span className="support-phone">028.3622.1060</span>{" "}
                        <span className="support-time">(8h00 - 21h30)</span>
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Hiển thị phần còn lại chỉ khi có sản phẩm */}
            {products.length > 0 && (
              <>
                {/* Special Requests */}
                <div className="order-special-requests">
                  {/* Giữ nguyên code */}
                </div>

                {/* Discount Section */}
                <div className="discount-section">{/* Giữ nguyên code */}</div>

                {/* Grand Total */}
                <div className="grand-total">
                  <div className="total-row">
                    <span className="grand-total-label">Tổng tiền</span>
                    <span className="grand-total-value">
                      {formatPrice(subTotal)}
                    </span>
                  </div>
                  <div className="loyalty-earning">
                    <span>Điểm tích lũy Quà Tặng VIP</span>
                    <span className="points-value">26.240 điểm</span>
                  </div>
                </div>

                {/* Buttons */}
                <button className="checkout-btn">TIẾN HÀNH ĐẶT HÀNG</button>
                <button className="continue-btn" onClick={() => navigate("/")}>
                  Tiếp tục mua sắm
                </button>
              </>
            )}
          </>
        )}

        {products.length > 0 && (
          <>
            {/* Order Summary */}

            <div className="order-special-requests">
              <h4>Yêu cầu đặc biệt</h4>
              <div className="special-request-options">
                <label className="request-option">
                  <input
                    type="checkbox"
                    name="instruction"
                    checked={specialRequests.instruction}
                    onChange={handleSpecialRequestChange}
                  />
                  <span>Hướng dẫn sử dụng, giải đáp thắc mắc sản phẩm</span>
                </label>
                <label className="request-option">
                  <input
                    type="checkbox"
                    name="invoice"
                    checked={specialRequests.invoice}
                    onChange={handleSpecialRequestChange}
                  />
                  <span>Xuất hóa đơn công ty</span>
                </label>
                {specialRequests.invoice && (
                  <div className="invoice-form">
                    <div className="invoice-field">
                      <input
                        type="text"
                        name="companyName"
                        value={invoiceData.companyName}
                        onChange={handleInvoiceInputChange}
                        placeholder="Tên công ty"
                      />
                    </div>
                    <div className="invoice-field">
                      <input
                        type="text"
                        name="companyAddress"
                        value={invoiceData.companyAddress}
                        onChange={handleInvoiceInputChange}
                        placeholder="Địa chỉ công ty"
                      />
                    </div>
                    <div className="invoice-field">
                      <input
                        type="text"
                        name="taxCode"
                        value={invoiceData.taxCode}
                        onChange={handleInvoiceInputChange}
                        placeholder="Mã số thuế"
                      />
                    </div>
                    <div className="invoice-field">
                      <input
                        type="email"
                        name="email"
                        value={invoiceData.email}
                        onChange={handleInvoiceInputChange}
                        placeholder="Email (không bắt buộc)"
                      />
                    </div>
                  </div>
                )}
                <label className="request-option">
                  <input
                    type="checkbox"
                    name="other"
                    checked={specialRequests.other}
                    onChange={handleSpecialRequestChange}
                  />
                  <span>Yêu cầu khác</span>
                </label>
              </div>

              {/* Thêm textarea cho yêu cầu khác nếu cần */}
              {specialRequests.other && (
                <div className="invoice-field">
                  <input placeholder="Yêu cầu khác"></input>
                </div>
              )}
            </div>

            <div className="discount-section">
              <div className="discount-code">
                <div className="discount-icon">
                  <i className="fa-solid fa-ticket"></i>
                </div>
                <div className="discount-text">Sử dụng mã giảm giá</div>
                <div className="discount-arrow">
                  <FaAngleRight />
                </div>
              </div>

              <div className="loyalty-points">
                <div className="loyalty-option">
                  <div className="loyalty-icon">
                    <img
                      src="https://cdn-icons-png.flaticon.com/512/1041/1041373.png"
                      alt="Points"
                      width="20"
                      height="20"
                    />
                  </div>
                  <div className="loyalty-text">Dùng điểm Quà Tặng VIP</div>
                  <div className="loyalty-toggle">
                    <label className="switch">
                      <input type="checkbox" />
                      <span className="slider round"></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="grand-total">
              <div className="total-row">
                <span className="grand-total-label">Tổng tiền</span>
                <span className="grand-total-value">
                  {formatPrice(subTotal)}
                </span>
              </div>
              <div className="loyalty-earning">
                <span>Điểm tích lũy Quà Tặng VIP</span>
                <span className="points-value">26.240 điểm</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button className="checkout-btn">TIẾN HÀNH ĐẶT HÀNG</button>

            {/* Continue Shopping */}
            <button className="continue-btn">Tiếp tục mua sắm</button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default CartPage;
