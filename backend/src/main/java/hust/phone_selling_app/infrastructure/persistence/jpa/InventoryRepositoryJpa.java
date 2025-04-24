package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.InventoryModel;

public interface InventoryRepositoryJpa extends JpaRepository<InventoryModel, Long> {

    Optional<InventoryModel> findByVariantId(Long variantId);

    void deleteByVariantId(Long variantId);

}
