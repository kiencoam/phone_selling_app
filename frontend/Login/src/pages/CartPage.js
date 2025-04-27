import React, { useState, useEffect } from "react";
import "../assets/styles/CartPage.css";
import CartItem from "../components/CartItem";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  FaMapMarkerAlt,
  FaAngleRight,
  FaClock,
  FaChevronDown,
  FaTimes,
  FaPen,
  FaPlus,
} from "react-icons/fa";
import { TbTruckDelivery } from "react-icons/tb";
import { IoStorefront } from "react-icons/io5";

const CartPage = () => {
  // Thêm state cho thông tin người nhận và phương thức giao hàng
  const [deliveryMethod, setDeliveryMethod] = useState("delivery"); // 'delivery' hoặc 'pickup'
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
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      phone: "0865225504",
      address: "118 đường thư lâm, Xã Thụy Lâm, Huyện Đông Anh, Hà Nội",
      receiveName: "Chị Thị Linh",
      isDefault: true,
    },
    {
      id: 2,
      phone: "0865225504",
      address: "15 Đường Trần Phú, Phường Mộ Lao, Quận Hà Đông, Hà Nội",
      receiveName: "Chị Thị Linh",
      isDefault: false,
    },
    {
      id: 3,
      phone: "0865225504",
      address: "48 Tố Hữu, Phường Vạn Phúc, Quận Hà Đông, Hà Nội",
      receiveName: "Chị Thị Linh",
      isDefault: false,
    },
  ]);

  // Địa chỉ hiện tại được chọn
  const [selectedAddress, setSelectedAddress] = useState(
    addresses.find((addr) => addr.isDefault) || addresses[0]
  );
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
  const [products, setProducts] = useState([
    {
      id: 1,
      quantity: 1,
      catalogItem: {
        id: 1,
        name: "Máy tính bảng iPad Air 6 M2 11 inch WiFi 1TB",
        image: {
          id: "ipad1",
          base64:
            "https://cdn.tgdd.vn/Products/Images/522/302135/ipad-air-m2-wifi-den-thumb-600x600.jpeg",
          isPrimary: true,
        },
        basePrice: 25790000,
        rating: 4.9,
        reviewsCount: 241,
        price: 25790000,
      },
      variant: {
        id: 101,
        code: "ipad-blue",
        color: "Màu Xanh Dương",
        productId: 1,
        images: [
          {
            id: "ipad1-blue",
            base64:
              "https://cdn.tgdd.vn/Products/Images/522/302135/ipad-air-m2-wifi-den-thumb-600x600.jpeg",
            isPrimary: true,
          },
        ],
        inventory: {
          id: 1001,
          available: 15,
          sold: 85,
        },
      },
      flashSale: {
        active: true,
        endTime: "02:52:35",
      },
      promotions: 3,
    },
    {
      id: 2,
      quantity: 1,
      catalogItem: {
        id: 2,
        name: "Tai nghe Có dây AVA+ LiveBass Y231",
        image: {
          id: "headphone1",
          base64:
            "https://cdn.tgdd.vn/Products/Images/54/248455/tai-nghe-ep-ava-y231-den-thumb-600x600.jpeg",
          isPrimary: true,
        },
        basePrice: 200000,
        rating: 4.5,
        reviewsCount: 128,
        price: 90000,
      },
      variant: {
        id: 201,
        code: "ava-black",
        color: "Màu Đen",
        productId: 2,
        images: [
          {
            id: "headphone1-black",
            base64:
              "https://cdn.tgdd.vn/Products/Images/54/248455/tai-nghe-ep-ava-y231-den-thumb-600x600.jpeg",
            isPrimary: true,
          },
        ],
        inventory: {
          id: 2001,
          available: 30,
          sold: 70,
        },
      },
      promotions: 2,
    },
  ]);

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

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;

    setProducts(
      products.map((product) =>
        product.id === id ? { ...product, quantity: newQuantity } : product
      )
    );
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
            <div className="recipient-header">
              <span className="recipient-name">
                Người nhận: {selectedAddress.receiveName} -{" "}
                {selectedAddress.phone}
              </span>
              <button className="recipient-edit" onClick={openAddressModal}>
                <FaAngleRight />
              </button>
            </div>
            <div className="recipient-address">
              <FaMapMarkerAlt className="location-icon" />
              <span>{selectedAddress.address}</span>
            </div>
          </div>
        )}

        {/* Products List and other content as before */}
        {/* ... */}

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

        {/* Phần Products List và phần còn lại giữ nguyên */}
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
            <div className="empty-cart">
              <p>Giỏ hàng của bạn đang trống</p>
              <button className="continue-shopping">Tiếp tục mua sắm</button>
            </div>
          )}
        </div>

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
