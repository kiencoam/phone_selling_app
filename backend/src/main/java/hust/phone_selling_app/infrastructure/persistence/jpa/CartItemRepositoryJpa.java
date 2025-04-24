package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.CartItemModel;

public interface CartItemRepositoryJpa extends JpaRepository<CartItemModel, Long> {

    List<CartItemModel> findByUserId(Long userId);

    void deleteByUserId(Long userId);

    void deleteByVariantId(Long variantId);

    Optional<CartItemModel> findByUserIdAndVariantId(Long userId, Long variantId);

}
