package hust.phone_selling_app.domain.product;

import java.util.List;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.shared.ProductSearchCriteria;
import hust.phone_selling_app.domain.shared.ReviewSearchCriteria;

public interface ProductRepository {

    public Product create(Product product);

    public Product update(Product product);

    public void delete(Long id);

    public Product findById(Long id);

    public Page<Product> search(ProductSearchCriteria criteria);

    public List<Product> findByProductLineId(Long productLineId);

    public List<Product> findByCategoryId(Long categoryId);

    public ProductAttribute findProductAttributeById(Long id);

    public List<ProductAttribute> getAllProductAttributes(Long productId);

    public ProductAttribute updateProductAttribute(ProductAttribute productAttribute);

    public ProductAttribute createProductAttribute(Long attributeId, Long productId);

    public void deleteProductAttributeByAttributeId(Long attributeId);

    public Review addReview(Long productId, Review review);

    public Page<Review> searchReviews(ReviewSearchCriteria criteria);

}
