import React from "react";
import "../assets/styles/CartItem.css";
import { FaClock, FaTags, FaAngleRight, FaAngleDown } from "react-icons/fa";

const CartItem = ({ product, updateQuantity, removeProduct, formatPrice }) => {
  return (
    <div className="cart-item">
      <div className="item-main">
        <div className="product-image">
          <img 
            src={product.variant.images?.[0]?.base64 || product.catalogItem.image.base64} 
            alt={product.catalogItem.name} 
          />
        </div>
        
        <div className="product-info">
          <h3 className="product-name">{product.catalogItem.name}</h3>
          
          {product.variant.color && (
            <div className="product-variant">
              <span className="variant-label">{product.variant.color}</span>
              <FaAngleDown className="variant-icon" />
            </div>
          )}
          
          {product.flashSale?.active && (
            <div className="product-flashsale">
              <FaClock className="flashsale-icon" />
              <span className="flashsale-text">
                Flashsale kết thúc sau: <span className="flashsale-time">{product.flashSale.endTime}</span>
              </span>
              <FaAngleRight className="flashsale-arrow" />
            </div>
          )}
          
          {product.promotions > 0 && (
            <div className="product-promotions">
              <FaTags className="promotions-icon" />
              <span className="promotions-text">
                {product.promotions} Khuyến mãi <FaAngleDown className="promotions-arrow" />
              </span>
            </div>
          )}
        </div>
        
        <div className="product-price">
          <span className="current-price">{formatPrice(product.catalogItem.price)}</span>
          {product.catalogItem.basePrice > product.catalogItem.price && (
            <span className="original-price">{formatPrice(product.catalogItem.basePrice)}</span>
          )}
        </div>
      </div>
      
      <div className="item-actions">
        <button 
          className="remove-btn"
          onClick={() => removeProduct(product.id)}
        >
          Xoá
        </button>
        
        <div className="quantity-controls">
          <button 
            className="quantity-btn minus"
            onClick={() => updateQuantity(product.id, product.quantity - 1)}
            disabled={product.quantity <= 1}
          >
            −
          </button>
          
          <input
            type="text"
            className="quantity-input"
            value={product.quantity}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (!isNaN(value) && value >= 1) {
                updateQuantity(product.id, value);
              }
            }}
            min="1"
          />
          
          <button 
            className="quantity-btn plus"
            onClick={() => updateQuantity(product.id, product.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;