package hust.phone_selling_app.domain.user;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface UserRepository {

    public User findByEmail(String email);

    public User findById(Long id);

    public User save(User user);

    public void deleteById(Long id);

    public Page<User> findByRoleAndKeyword(Long roleId, String keyword, Pageable pageable);

    public ShippingInfo addShippingInfo(Long userId, ShippingInfo shippingInfo);

    public ShippingInfo updateShippingInfo(Long userId, ShippingInfo shippingInfo);

    public void removeShippingInfo(Long userId, Long shippingInfoId);

}
