package hust.phone_selling_app.domain.user;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository {

    public User findByEmail(String email);

    public User findById(Long id);

    public User save(User user);

    public void deleteById(Long id);

    public Page<User> findByRoleAndKeyword(Long roleId, String keyword, Pageable pageable);

    public List<ShippingInfo> findShippingInfosByUserId(Long userId);

    public ShippingInfo findShippingInfoById(Long shippingInfoId);

    public ShippingInfo addShippingInfo(Long userId, ShippingInfo shippingInfo);

    public ShippingInfo updateShippingInfo(Long userId, ShippingInfo shippingInfo);

    public void removeShippingInfo(Long userId, Long shippingInfoId);

    public CartItem addCartItem(Long userId, Long variantId, int quantity);

    public CartItem updateCartItem(Long userId, Long variantId, int quantity);

    public void removeCartItem(Long userId, Long variantId);

    public void removeCartItemByVariantId(Long variantId);

    public List<CartItem> findCartItemsByUserId(Long userId);

    public void removeCartItemsByUserId(Long userId);

}
