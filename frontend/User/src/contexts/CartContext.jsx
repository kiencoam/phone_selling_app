import React, { createContext, useState, useEffect, useContext } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { ApiService } from '../services/api';
import { useAuth } from './AuthContext';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage('cartItems', []);
  const [guestCartItems, setGuestCartItems] = useLocalStorage('guestCartItems', []);
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

  // Tải giỏ hàng và xử lý chuyển đổi khi trạng thái đăng nhập thay đổi
  useEffect(() => {
    const handleAuthChange = async () => {
      console.log('[CartContext] handleAuthChange - auth status changed', { isAuthenticated, hasUser: !!user });
      
      if (isAuthenticated && user) {
        // Người dùng vừa đăng nhập
        setLoading(true);
        try {
          console.log('[CartContext] handleAuthChange - user logged in, loading cart from API');
          // Tải giỏ hàng từ API
          const userCart = await ApiService.getCart();
          let mergedCart = [];
          
          // Kiểm tra giỏ hàng khách
          if (guestCartItems && guestCartItems.length > 0) {
            console.log('[CartContext] handleAuthChange - merging guest cart with user cart');
            
            // Nếu có sẵn giỏ hàng khách, hợp nhất với giỏ hàng người dùng
            const combinedCartItems = [...userCart?.items || []];
            
            // Thêm các sản phẩm từ giỏ hàng khách vào giỏ hàng người dùng
            for (const guestItem of guestCartItems) {
              // Kiểm tra xem sản phẩm đã có trong giỏ hàng người dùng chưa
              const existingItemIndex = combinedCartItems.findIndex(item => item.id === guestItem.id);
              
              if (existingItemIndex >= 0) {
                // Cập nhật số lượng nếu đã có
                combinedCartItems[existingItemIndex].quantity += guestItem.quantity;
              } else {
                // Thêm mới nếu chưa có
                combinedCartItems.push({ ...guestItem });
              }
              
              // Đồng bộ với API (trong môi trường thực tế)
              await ApiService.addToCart(guestItem.id, guestItem.quantity);
            }
            
            mergedCart = combinedCartItems;
            // Xóa giỏ hàng khách sau khi đã hợp nhất
            setGuestCartItems([]);
          } else {
            // Nếu không có giỏ hàng khách, chỉ sử dụng giỏ hàng người dùng
            mergedCart = userCart?.items || [];
          }
          
          console.log('[CartContext] handleAuthChange - set merged cart', { itemCount: mergedCart.length });
          setCartItems(mergedCart);
        } catch (err) {
          console.error('[CartContext] handleAuthChange - error loading user cart', err);
          setError('Không thể tải giỏ hàng. Vui lòng thử lại sau.');
        } finally {
          setLoading(false);
        }
      } else if (!isAuthenticated) {
        // Người dùng vừa đăng xuất
        console.log('[CartContext] handleAuthChange - user logged out, using guest cart');
        // Chuyển sang giỏ hàng khách
        setCartItems(guestCartItems);
      }
    };

    handleAuthChange();
  }, [isAuthenticated, user, setCartItems, guestCartItems, setGuestCartItems]);

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

  // Thêm vào giỏ hàng, xử lý cả đã đăng nhập và chưa đăng nhập
  const addToCart = async (product, quantity = 1) => {
    console.log('[CartContext] addToCart - start', { 
      productId: product.id, 
      productName: product.name, 
      quantity,
      isAuthenticated
    });
    setLoading(true);
    setError(null);
    
    try {
      if (isAuthenticated) {
        // Nếu đã đăng nhập, gọi API để thêm vào giỏ hàng
        console.log('[CartContext] addToCart - calling API (authenticated)');
        await ApiService.addToCart(product.id, quantity);
      } else {
        // Nếu chưa đăng nhập, chỉ lưu vào localStorage
        console.log('[CartContext] addToCart - adding to guest cart (not authenticated)');
        
        // Cập nhật giỏ hàng khách
        setGuestCartItems(prevItems => {
          const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
          
          if (existingItemIndex >= 0) {
            // Cập nhật số lượng nếu sản phẩm đã tồn tại
            const updatedItems = [...prevItems];
            updatedItems[existingItemIndex] = {
              ...updatedItems[existingItemIndex],
              quantity: updatedItems[existingItemIndex].quantity + quantity
            };
            return updatedItems;
          } else {
            // Thêm mới nếu sản phẩm chưa tồn tại
            return [...prevItems, { ...product, quantity }];
          }
        });
      }
      
      // Cập nhật state cartItems (hiển thị cho người dùng)
      setCartItems(prevItems => {
        // Kiểm tra sản phẩm đã tồn tại chưa
        const existingItemIndex = prevItems.findIndex(item => item.id === product.id);
        
        if (existingItemIndex >= 0) {
          // Cập nhật số lượng nếu đã tồn tại
          console.log('[CartContext] addToCart - updating existing item');
          const updatedItems = [...prevItems];
          updatedItems[existingItemIndex] = {
            ...updatedItems[existingItemIndex],
            quantity: updatedItems[existingItemIndex].quantity + quantity
          };
          return updatedItems;
        } else {
          // Thêm mới nếu chưa tồn tại
          console.log('[CartContext] addToCart - adding new item');
          return [...prevItems, { ...product, quantity }];
        }
      });
      
      console.log('[CartContext] addToCart - success');
      return { success: true };
    } catch (err) {
      console.error('[CartContext] addToCart - error', err);
      setError(err.message || 'Không thể thêm sản phẩm vào giỏ hàng');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Cập nhật số lượng sản phẩm trong giỏ hàng
  const updateCartItemQuantity = async (productId, quantity) => {
    console.log('[CartContext] updateCartItemQuantity', { productId, quantity, isAuthenticated });
    setLoading(true);
    setError(null);
    
    try {
      if (quantity <= 0) {
        // Nếu số lượng <= 0, xóa sản phẩm khỏi giỏ hàng
        console.log('[CartContext] updateCartItemQuantity - removing item (quantity <= 0)');
        return removeFromCart(productId);
      }
      
      if (isAuthenticated) {
        // Nếu đã đăng nhập, gọi API để cập nhật
        console.log('[CartContext] updateCartItemQuantity - calling API (authenticated)');
        await ApiService.updateCartItem(productId, quantity);
      } else {
        // Nếu chưa đăng nhập, cập nhật giỏ hàng khách
        console.log('[CartContext] updateCartItemQuantity - updating guest cart (not authenticated)');
        setGuestCartItems(prevItems => 
          prevItems.map(item => 
            item.id === productId ? { ...item, quantity } : item
          )
        );
      }
      
      // Cập nhật state cartItems (hiển thị cho người dùng)
      setCartItems(prevItems => 
        prevItems.map(item => 
          item.id === productId ? { ...item, quantity } : item
        )
      );
      
      console.log('[CartContext] updateCartItemQuantity - success');
      return { success: true };
    } catch (err) {
      console.error('[CartContext] updateCartItemQuantity - error', err);
      setError(err.message || 'Không thể cập nhật số lượng sản phẩm');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Xóa sản phẩm khỏi giỏ hàng
  const removeFromCart = async (productId) => {
    console.log('[CartContext] removeFromCart', { productId, isAuthenticated });
    setLoading(true);
    setError(null);
    
    try {
      if (isAuthenticated) {
        // Nếu đã đăng nhập, gọi API để xóa
        console.log('[CartContext] removeFromCart - calling API (authenticated)');
        await ApiService.removeFromCart(productId);
      } else {
        // Nếu chưa đăng nhập, cập nhật giỏ hàng khách
        console.log('[CartContext] removeFromCart - updating guest cart (not authenticated)');
        setGuestCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      }
      
      // Cập nhật state cartItems (hiển thị cho người dùng)
      setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
      
      console.log('[CartContext] removeFromCart - success');
      return { success: true };
    } catch (err) {
      console.error('[CartContext] removeFromCart - error', err);
      setError(err.message || 'Không thể xóa sản phẩm khỏi giỏ hàng');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Xóa toàn bộ giỏ hàng
  const clearCart = async () => {
    console.log('[CartContext] clearCart - start', { isAuthenticated });
    setLoading(true);
    setError(null);
    
    try {
      if (isAuthenticated) {
        // Nếu đã đăng nhập, gọi API để xóa
        console.log('[CartContext] clearCart - calling API (authenticated)');
        // Đối với clearCart, chúng ta có thể cần gọi nhiều API để xóa từng sản phẩm
        // hoặc có một API riêng để xóa toàn bộ giỏ hàng
        for (const item of cartItems) {
          await ApiService.removeFromCart(item.id);
        }
      } else {
        // Nếu chưa đăng nhập, xóa giỏ hàng khách
        console.log('[CartContext] clearCart - clearing guest cart (not authenticated)');
        setGuestCartItems([]);
      }
      
      // Xóa state cartItems (hiển thị cho người dùng)
      setCartItems([]);
      
      console.log('[CartContext] clearCart - success');
      return { success: true };
    } catch (err) {
      console.error('[CartContext] clearCart - error', err);
      setError(err.message || 'Không thể xóa giỏ hàng');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Chuyển từ giỏ hàng khách sang giỏ hàng đã đăng nhập
  const migrateGuestCartToUserCart = async () => {
    console.log('[CartContext] migrateGuestCartToUserCart - start', {
      guestItemCount: guestCartItems.length,
      isAuthenticated
    });
    
    if (!isAuthenticated || guestCartItems.length === 0) {
      console.log('[CartContext] migrateGuestCartToUserCart - skipped (not authenticated or empty guest cart)');
      return;
    }
    
    setLoading(true);
    try {
      // Đồng bộ từng sản phẩm trong giỏ hàng khách lên API
      for (const item of guestCartItems) {
        await ApiService.addToCart(item.id, item.quantity);
      }
      
      // Tải lại giỏ hàng từ API
      const userCart = await ApiService.getCart();
      setCartItems(userCart?.items || []);
      
      // Xóa giỏ hàng khách
      setGuestCartItems([]);
      
      console.log('[CartContext] migrateGuestCartToUserCart - success');
    } catch (err) {
      console.error('[CartContext] migrateGuestCartToUserCart - error', err);
      setError('Không thể chuyển giỏ hàng. Vui lòng thử lại sau.');
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
    migrateGuestCartToUserCart,
    isAuthenticated
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}; 