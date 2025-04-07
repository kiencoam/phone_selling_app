package hust.phone_selling_app.interfaces.product.facade;

import java.util.List;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductAttribute;
import hust.phone_selling_app.domain.shared.ProductSearchCriteria;
import hust.phone_selling_app.domain.shared.ReviewSearchCriteria;
import hust.phone_selling_app.interfaces.product.facade.dto.CatalogItemDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ProductAttributeDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ProductDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ReviewDTO;

public interface ProductServiceFacade {

    public ProductDTO create(Product product, Image image);

    public ProductDTO update(Product product, Image image);

    public void delete(Long id);

    public ProductDTO findById(Long id);

    public CatalogItemDTO findCatalogItemById(Long id);

    public Page<CatalogItemDTO> search(ProductSearchCriteria criteria);

    public List<CatalogItemDTO> findByProductLineId(Long productLineId);

    public List<ProductAttributeDTO> findProductAttributesByProductId(Long productId);

    public ProductAttributeDTO updateProductAttribute(ProductAttribute productAttribute);

    public ReviewDTO createReview(Long reviewPermissionId, Long userId, Integer rating, String content);

    public Page<ReviewDTO> searchReviews(ReviewSearchCriteria criteria);

}
