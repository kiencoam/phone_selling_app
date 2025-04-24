package hust.phone_selling_app.infrastructure.persistence.custom;

import java.util.List;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.shared.ProductSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.model.ProductModel;

public interface CustomProductRepository {

    Page<ProductModel> search(ProductSearchCriteria criteria);

    List<ProductModel> findByCategoryId(Long categoryId);

}
