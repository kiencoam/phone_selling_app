package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.VariantModel;

public interface VariantRepositoryJpa extends JpaRepository<VariantModel, Long> {

    List<VariantModel> findByProductId(Long productId);

}
