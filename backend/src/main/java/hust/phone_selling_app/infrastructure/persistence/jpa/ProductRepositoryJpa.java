package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.custom.CustomProductRepository;
import hust.phone_selling_app.infrastructure.persistence.model.ProductModel;

public interface ProductRepositoryJpa extends JpaRepository<ProductModel, Long>, CustomProductRepository {

    List<ProductModel> findByProductLineId(Long productLineId);

}
