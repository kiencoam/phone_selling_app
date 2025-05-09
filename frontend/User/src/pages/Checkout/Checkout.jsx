import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Checkout.module.css';

const Checkout = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'cod'
  });
  
  // Giả lập dữ liệu giỏ hàng
  const cartItems = [
    {
      id: 1,
      name: 'iPhone 15 Pro Max',
      price: 32990000,
      imageUrl: '/assets/images/products/iphone-15-pro-max.jpg',
      quantity: 1
    },
    {
      id: 5,
      name: 'MacBook Pro 16 M3 Max',
      price: 85990000,
      imageUrl: '/assets/images/products/macbook-pro-16.jpg',
      quantity: 1
    }
  ];
  
  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 0; // Miễn phí vận chuyển
  const total = subtotal + shipping;
  
  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
      maximumFractionDigits: 0
    }).format(price);
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order submitted:', { ...formData, items: cartItems, total });
    // Implement order submission logic
    alert('Đặt hàng thành công!');
  };

  return (
    <div className={styles.checkoutPage}>
      <h1>Thanh toán</h1>
      
      <div className={styles.checkoutContent}>
        <div className={styles.checkoutForm}>
          <form onSubmit={handleSubmit}>
            <h2>Thông tin giao hàng</h2>
            
            <div className={styles.formGroup}>
              <label htmlFor="fullName">Họ và tên</label>
              <input 
                type="text" 
                id="fullName" 
                name="fullName" 
                value={formData.fullName} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  value={formData.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className={styles.formGroup}>
                <label htmlFor="phone">Số điện thoại</label>
                <input 
                  type="tel" 
                  id="phone" 
                  name="phone" 
                  value={formData.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="address">Địa chỉ</label>
              <input 
                type="text" 
                id="address" 
                name="address" 
                value={formData.address} 
                onChange={handleChange} 
                required 
              />
            </div>
            
            <div className={styles.formGroup}>
              <label htmlFor="city">Tỉnh/Thành phố</label>
              <select 
                id="city" 
                name="city" 
                value={formData.city} 
                onChange={handleChange} 
                required
              >
                <option value="">Chọn tỉnh/thành phố</option>
                <option value="hanoi">Hà Nội</option>
                <option value="hcm">TP HCM</option>
                <option value="danang">Đà Nẵng</option>
                <option value="other">Tỉnh/Thành phố khác</option>
              </select>
            </div>
            
            <h2>Phương thức thanh toán</h2>
            
            <div className={styles.paymentMethods}>
              <div className={styles.paymentMethod}>
                <input 
                  type="radio" 
                  id="cod" 
                  name="paymentMethod" 
                  value="cod" 
                  checked={formData.paymentMethod === 'cod'} 
                  onChange={handleChange} 
                />
                <label htmlFor="cod">Thanh toán khi nhận hàng (COD)</label>
              </div>
              
              <div className={styles.paymentMethod}>
                <input 
                  type="radio" 
                  id="banking" 
                  name="paymentMethod" 
                  value="banking" 
                  checked={formData.paymentMethod === 'banking'} 
                  onChange={handleChange} 
                />
                <label htmlFor="banking">Chuyển khoản ngân hàng</label>
              </div>
              
              <div className={styles.paymentMethod}>
                <input 
                  type="radio" 
                  id="credit" 
                  name="paymentMethod" 
                  value="credit" 
                  checked={formData.paymentMethod === 'credit'} 
                  onChange={handleChange} 
                />
                <label htmlFor="credit">Thẻ tín dụng/Ghi nợ</label>
              </div>
            </div>
            
            <div className={styles.formActions}>
              <Link to="/cart" className={styles.backToCart}>
                Quay lại giỏ hàng
              </Link>
              <button type="submit" className={styles.orderButton}>
                Đặt hàng
              </button>
            </div>
          </form>
        </div>
        
        <div className={styles.orderSummary}>
          <h2>Đơn hàng của bạn</h2>
          
          <div className={styles.orderItems}>
            {cartItems.map(item => (
              <div key={item.id} className={styles.orderItem}>
                <div className={styles.itemImage}>
                  <img src={item.imageUrl} alt={item.name} />
                  <span className={styles.itemQuantity}>{item.quantity}</span>
                </div>
                <div className={styles.itemDetails}>
                  <h4>{item.name}</h4>
                  <div>{formatPrice(item.price)}</div>
                </div>
              </div>
            ))}
          </div>
          
          <div className={styles.orderTotals}>
            <div className={styles.orderRow}>
              <span>Tạm tính:</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            
            <div className={styles.orderRow}>
              <span>Phí vận chuyển:</span>
              <span>{formatPrice(shipping)}</span>
            </div>
            
            <div className={styles.orderTotal}>
              <span>Tổng cộng:</span>
              <span>{formatPrice(total)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 