package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import hust.phone_selling_app.infrastructure.persistence.model.ProductLineModel;

public interface ProductLineRepositoryJpa
        extends JpaRepository<ProductLineModel, Long>, JpaSpecificationExecutor<ProductLineModel> {

    Optional<ProductLineModel> findByCode(String code);

    List<ProductLineModel> findByCategoryId(Long categoryId);

    List<ProductLineModel> findByBrandId(Long brandId);

}
