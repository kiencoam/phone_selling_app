import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export const useCart = () => {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  console.log('[useCart] Hook initialized', { isAuthenticated });

  const showLoginPrompt = () => {
    console.log('[useCart] showLoginPrompt - triggered');
    if (window.confirm('Bạn cần đăng nhập để thực hiện hành động này. Chuyển đến trang đăng nhập?')) {
      console.log('[useCart] showLoginPrompt - redirecting to login');
      navigate('/login', { state: { returnUrl: window.location.pathname } });
    } else {
      console.log('[useCart] showLoginPrompt - user declined login redirect');
    }
    return Promise.resolve({ success: false, message: 'Yêu cầu đăng nhập' });
  };

  try {
    const context = useContext(CartContext);
    
    if (!context) {
      console.warn('[useCart] Used outside of CartProvider, using fallback values');
      return {
        cart: { items: [], total: 0, itemCount: 0 },
        loading: false,
        error: null,
        isAuthenticated: false,
        addToCart: showLoginPrompt,
        updateCartItemQuantity: showLoginPrompt,
        removeFromCart: showLoginPrompt,
        clearCart: showLoginPrompt
      };
    }
    
    // Nếu không đăng nhập, ghi đè các phương thức để hiển thị thông báo đăng nhập
    if (!isAuthenticated) {
      console.log('[useCart] User not authenticated, wrapping cart methods with login prompt');
      return {
        cart: { items: [], total: 0, itemCount: 0 },
        loading: false,
        error: null,
        isAuthenticated: false,
        addToCart: showLoginPrompt,
        updateCartItemQuantity: showLoginPrompt,
        removeFromCart: showLoginPrompt,
        clearCart: showLoginPrompt
      };
    }
    
    // Người dùng đã đăng nhập, trả về các phương thức bình thường
    console.log('[useCart] User authenticated, returning normal cart methods');
    return {
      cart: context.cart,
      loading: context.loading,
      error: context.error,
      isAuthenticated: true,
      addToCart: context.addToCart,
      updateCartItemQuantity: context.updateCartItemQuantity,
      removeFromCart: context.removeFromCart,
      clearCart: context.clearCart
    };
  } catch (error) {
    console.error('[useCart] Error in hook:', error);
    return {
      cart: { items: [], total: 0, itemCount: 0 },
      loading: false,
      error: null,
      isAuthenticated: false,
      addToCart: showLoginPrompt,
      updateCartItemQuantity: showLoginPrompt,
      removeFromCart: showLoginPrompt,
      clearCart: showLoginPrompt
    };
  }
};

export default useCart; 