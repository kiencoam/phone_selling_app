import { useContext } from 'react';
import { CartContext } from '../contexts/CartContext';

export const useCart = () => {
  try {
    const context = useContext(CartContext);
    
    if (!context) {
      console.warn('useCart was used outside of CartProvider, using fallback values');
      return {
        cart: { items: [], total: 0, itemCount: 0 },
        loading: false,
        error: null,
        addToCart: () => {
          console.warn('addToCart called outside CartProvider');
          return Promise.resolve({ success: false, message: 'CartProvider not available' });
        },
        updateCartItemQuantity: () => {
          console.warn('updateCartItemQuantity called outside CartProvider');
          return Promise.resolve({ success: false, message: 'CartProvider not available' });
        },
        removeFromCart: () => {
          console.warn('removeFromCart called outside CartProvider');
          return Promise.resolve({ success: false, message: 'CartProvider not available' });
        },
        clearCart: () => {
          console.warn('clearCart called outside CartProvider');
          return Promise.resolve({ success: false, message: 'CartProvider not available' });
        }
      };
    }
    
    return {
      cart: context.cart,
      loading: context.loading,
      error: context.error,
      addToCart: context.addToCart,
      updateCartItemQuantity: context.updateCartItemQuantity,
      removeFromCart: context.removeFromCart,
      clearCart: context.clearCart
    };
  } catch (error) {
    console.error('Error in useCart hook:', error);
    return {
      cart: { items: [], total: 0, itemCount: 0 },
      loading: false,
      error: null,
      addToCart: () => Promise.resolve({ success: false }),
      updateCartItemQuantity: () => Promise.resolve({ success: false }),
      removeFromCart: () => Promise.resolve({ success: false }),
      clearCart: () => Promise.resolve({ success: false })
    };
  }
};

export default useCart; 