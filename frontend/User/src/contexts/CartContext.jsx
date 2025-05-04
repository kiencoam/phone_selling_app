import React, { createContext, useState, useEffect } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ApiService } from '../services/api.service';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  // Calculate totals whenever cart items change
  useEffect(() => {
    const calculateTotals = () => {
      const itemTotal = cartItems.reduce((total, item) => {
        const price = item.discountPrice || item.price;
        return total + price * item.quantity;
      }, 0);
      
      const count = cartItems.reduce((count, item) => count + item.quantity, 0);
      
      setTotal(itemTotal);
      setItemCount(count);
    };
    
    calculateTotals();
  }, [cartItems]);

  const addToCart = async (product, quantity = 1) => {
    setLoading(true);
    setError(null);
    
    try {
      // Call API (in a real app)
      await ApiService.addToCart(product.id, quantity);
      
      // Update local state
      setCartItems(prevItems => {
        // Check if the product is already in the cart
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Product exists, update quantity
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          // Product doesn't exist, add new item
          return [...prevItems, { ...product, quantity }];
        }
      });
      
      return { success: true };
    } catch (err) {
      console.error('Add to cart error:', err);
      setError(err.message || 'Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = (productId, quantity) => {
    setLoading(true);
    
    try {
      if (quantity <= 0) {
        // If quantity is zero or negative, remove the item
        removeFromCart(productId);
      } else {
        // Update quantity
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
      
      return { success: true };
    } catch (err) {
      console.error('Update cart quantity error:', err);
      setError(err.message || 'Failed to update cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (productId) => {
    setLoading(true);
    
    try {
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      return { success: true };
    } catch (err) {
      console.error('Remove from cart error:', err);
      setError(err.message || 'Failed to remove item from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    setLoading(true);
    
    try {
      setCartItems([]);
      return { success: true };
    } catch (err) {
      console.error('Clear cart error:', err);
      setError(err.message || 'Failed to clear cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    cart: {
      items: cartItems,
      total,
      itemCount,
    },
    loading,
    error,
    addToCart,
    updateCartItemQuantity,
    removeFromCart,
    clearCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 