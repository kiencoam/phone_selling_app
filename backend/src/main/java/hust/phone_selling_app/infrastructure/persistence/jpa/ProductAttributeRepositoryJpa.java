package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.ProductAttributeModel;

public interface ProductAttributeRepositoryJpa
        extends JpaRepository<ProductAttributeModel, Long> {

    List<ProductAttributeModel> findByProductId(Long productId);

    List<ProductAttributeModel> findByAttributeId(Long attributeId);

    void deleteByProductId(Long productId);

    void deleteByAttributeId(Long attributeId);

}
