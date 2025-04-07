package hust.phone_selling_app.interfaces.user.facade;

import java.util.List;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.user.ShippingInfo;
import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.interfaces.user.facade.dto.CartItemDTO;
import hust.phone_selling_app.interfaces.user.facade.dto.UserDTO;

public interface UserServiceFacade {

    public UserDTO save(User user);

    public Page<UserDTO> search(Long roleId, String keyword, int page, int size);

    public void deleteById(Long id);

    public List<ShippingInfo> getShippingInfos(Long userId);

    public ShippingInfo addShippingInfo(Long userId, ShippingInfo shippingInfo);

    public ShippingInfo updateShippingInfo(Long userId, ShippingInfo shippingInfo);

    public void removeShippingInfo(Long userId, Long shippingInfoId);

    public UserDTO getUserById(Long id);

    public List<CartItemDTO> getCartItems(Long userId);

    public CartItemDTO addToCart(Long userId, Long variantId, int quantity);

    public CartItemDTO updateCartItem(Long userId, Long variantId, int quantity);

    public void removeFromCart(Long userId, Long variantId);

}
