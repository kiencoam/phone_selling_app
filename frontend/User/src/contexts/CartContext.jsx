import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ApiService } from '../services/api';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);
  const { isAuthenticated, user } = useAuth();

  // Log khi khởi tạo
  useEffect(() => {
    console.log('[CartContext] Initialized', {
      itemCount: cartItems.length,
      isAuthenticated
    });
  }, []);

  // Tải giỏ hàng từ API khi người dùng đăng nhập
  useEffect(() => {
    const fetchCart = async () => {
      console.log('[CartContext] fetchCart - checking auth', { isAuthenticated, hasUser: !!user });
      if (isAuthenticated && user) {
        setLoading(true);
        try {
          console.log('[CartContext] fetchCart - loading from API');
          const userCart = await ApiService.getCart();
          if (userCart && userCart.items) {
            console.log('[CartContext] fetchCart - success', { itemCount: userCart.items.length });
            setCartItems(userCart.items);
          }
        } catch (err) {
          console.error('[CartContext] fetchCart - error', err);
          setError('Không thể tải giỏ hàng. Vui lòng thử lại sau.');
        } finally {
          setLoading(false);
        }
      } else {
        console.log('[CartContext] fetchCart - skipped (not authenticated)');
      }
    };

    fetchCart();
  }, [isAuthenticated, user, setCartItems]);

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
      
      console.log('[CartContext] Totals updated', { total: itemTotal, itemCount: count });
    };
    
    calculateTotals();
  }, [cartItems]);

  const requireAuth = () => {
    console.log('[CartContext] requireAuth - checking', { isAuthenticated });
    if (!isAuthenticated) {
      console.error('[CartContext] requireAuth - failed (not authenticated)');
      throw new Error('Bạn cần đăng nhập để thực hiện hành động này');
    }
    console.log('[CartContext] requireAuth - passed');
  };

  const addToCart = async (product, quantity = 1) => {
    console.log('[CartContext] addToCart - start', { 
      productId: product.id, 
      productName: product.name, 
      quantity 
    });
    setLoading(true);
    setError(null);
    
    try {
      // Kiểm tra xác thực
      requireAuth();
      
      // Call API (in a real app)
      console.log('[CartContext] addToCart - calling API');
      await ApiService.addToCart(product.id, quantity);
      
      // Update local state
      setCartItems(prevItems => {
        // Check if the product is already in the cart
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Product exists, update quantity
          console.log('[CartContext] addToCart - updating existing item');
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          // Product doesn't exist, add new item
          console.log('[CartContext] addToCart - adding new item');
          return [...prevItems, { ...product, quantity }];
        }
      });
      
      console.log('[CartContext] addToCart - success');
      return { success: true };
    } catch (err) {
      console.error('[CartContext] addToCart - error', err);
      setError(err.message || 'Failed to add item to cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCartItemQuantity = (productId, quantity) => {
    console.log('[CartContext] updateCartItemQuantity', { productId, quantity });
    setLoading(true);
    setError(null);
    
    try {
      // Kiểm tra xác thực
      requireAuth();
      
      if (quantity <= 0) {
        // If quantity is zero or negative, remove the item
        console.log('[CartContext] updateCartItemQuantity - removing item (quantity <= 0)');
        removeFromCart(productId);
      } else {
        // Update quantity
        console.log('[CartContext] updateCartItemQuantity - updating quantity');
        setCartItems(prevItems => 
          prevItems.map(item => 
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
      
      console.log('[CartContext] updateCartItemQuantity - success');
      return { success: true };
    } catch (err) {
      console.error('[CartContext] updateCartItemQuantity - error', err);
      setError(err.message || 'Failed to update cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const removeFromCart = (productId) => {
    console.log('[CartContext] removeFromCart', { productId });
    setLoading(true);
    setError(null);
    
    try {
      // Kiểm tra xác thực
      requireAuth();
      
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      console.log('[CartContext] removeFromCart - success');
      return { success: true };
    } catch (err) {
      console.error('[CartContext] removeFromCart - error', err);
      setError(err.message || 'Failed to remove item from cart');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const clearCart = () => {
    console.log('[CartContext] clearCart - start');
    setLoading(true);
    setError(null);
    
    try {
      // Kiểm tra xác thực
      requireAuth();
      
      setCartItems([]);
      console.log('[CartContext] clearCart - success');
      return { success: true };
    } catch (err) {
      console.error('[CartContext] clearCart - error', err);
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
    isAuthenticated
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 