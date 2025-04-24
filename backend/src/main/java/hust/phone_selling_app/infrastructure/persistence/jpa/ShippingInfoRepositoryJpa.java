package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.ShippingInfoModel;

public interface ShippingInfoRepositoryJpa extends JpaRepository<ShippingInfoModel, Long> {

    Optional<ShippingInfoModel> findByIdAndUserId(Long id, Long userId);

    List<ShippingInfoModel> findByUserId(Long userId);

    void deleteByUserId(Long userId);

}
