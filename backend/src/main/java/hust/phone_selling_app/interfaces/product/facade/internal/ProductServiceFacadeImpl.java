package hust.phone_selling_app.interfaces.product.facade.internal;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.ProductService;
import hust.phone_selling_app.domain.attribute.AttributeRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.image.ImageRepository;
import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductAttribute;
import hust.phone_selling_app.domain.product.ProductRepository;
import hust.phone_selling_app.domain.product.Review;
import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.domain.promotion.PromotionRepository;
import hust.phone_selling_app.domain.reviewpermission.ReviewPermission;
import hust.phone_selling_app.domain.reviewpermission.ReviewPermissionRepository;
import hust.phone_selling_app.domain.shared.ProductSearchCriteria;
import hust.phone_selling_app.domain.shared.ReviewSearchCriteria;
import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.domain.user.UserRepository;
import hust.phone_selling_app.interfaces.product.facade.ProductServiceFacade;
import hust.phone_selling_app.interfaces.product.facade.dto.CatalogItemDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ProductAttributeDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ProductDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ReviewDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.UserDTO;
import hust.phone_selling_app.interfaces.product.facade.internal.assembler.ProductAssembler;
import hust.phone_selling_app.interfaces.product.facade.internal.assembler.ProductAttributeAssembler;
import hust.phone_selling_app.interfaces.product.facade.internal.assembler.ReviewAssembler;
import hust.phone_selling_app.interfaces.product.facade.internal.assembler.UserAssembler;
import hust.phone_selling_app.interfaces.productline.facade.ProductLineServiceFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class ProductServiceFacadeImpl implements ProductServiceFacade {

    private final ProductService productService;
    private final ProductRepository productRepository;
    private final ImageRepository imageRepository;
    private final AttributeRepository attributeRepository;
    private final PromotionRepository promotionRepository;
    private final ProductLineRepository productLineRepository;
    private final ReviewPermissionRepository reviewPermissionRepository;
    private final UserRepository userRepository;
    private final ProductLineServiceFacade productLineServiceFacade;

    @Override
    public ProductDTO create(Product product, Image image) {
        product.setRating(0f);
        product.setReviewsCount(0);
        Product createdProduct = productService.createProduct(product, image);
        return ProductAssembler.toDTO(createdProduct);
    }

    @Override
    public ProductDTO update(Product product, Image image) {
        Product existingProduct = productRepository.findById(product.getId());
        if (existingProduct == null) {
            log.error("Product with id {} not found", product.getId());
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        existingProduct.setName(product.getName());
        existingProduct.setCode(product.getCode());
        existingProduct.setDescription(product.getDescription());
        existingProduct.setBasePrice(product.getBasePrice());

        Product updatedProduct = productService.updateProduct(existingProduct, image);
        return ProductAssembler.toDTO(updatedProduct);
    }

    @Override
    public void delete(Long id) {
        Product existingProduct = productRepository.findById(id);
        if (existingProduct == null) {
            log.error("Product with id {} not found", id);
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }
        productService.deleteProduct(existingProduct);
    }

    @Override
    public ProductDTO findById(Long id) {
        Product existingProduct = productRepository.findById(id);
        if (existingProduct == null) {
            log.error("Product with id {} not found", id);
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        ProductDTO dto = ProductAssembler.toDTO(existingProduct);

        dto.setProductLine(productLineServiceFacade.findById(existingProduct.getProductLineId()));

        Image image = imageRepository.findById(existingProduct.getImageId());
        if (image != null) {
            dto.setImage(image);
        } else {
            log.error("Image with id {} not found", existingProduct.getImageId());
            dto.setImage(null);
        }

        List<ProductAttribute> productAttributes = productRepository.getAllProductAttributes(id);
        List<ProductAttributeDTO> productAttributeDTOs = productAttributes.stream()
                .map(productAttribute -> {
                    ProductAttributeDTO productAttributeDTO = ProductAttributeAssembler.toDTO(productAttribute);
                    productAttributeDTO.setAttribute(attributeRepository.findById(productAttribute.getAttributeId()));
                    return productAttributeDTO;
                })
                .toList();
        dto.setAttributes(productAttributeDTOs);

        List<Promotion> promotions = promotionRepository
                .findInUsePromotionsByCategoryId(dto.getProductLine().getCategory().getId());
        dto.setPromotions(promotions);

        Long discount = promotions.stream()
                .map(Promotion::getValue)
                .reduce(0L, Long::sum);
        dto.setPrice(dto.getBasePrice() > discount ? dto.getBasePrice() - discount : 0L);

        return dto;
    }

    @Override
    public CatalogItemDTO findCatalogItemById(Long id) {
        Product existingProduct = productRepository.findById(id);
        if (existingProduct == null) {
            log.error("Product with id {} not found", id);
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        CatalogItemDTO catalogItemDTO = ProductAssembler.toCatalogItemDTO(existingProduct);

        Image image = imageRepository.findById(existingProduct.getImageId());
        if (image != null) {
            catalogItemDTO.setImage(image);
        } else {
            log.error("Image with id {} not found", existingProduct.getImageId());
            catalogItemDTO.setImage(null);
        }

        ProductLine productLine = productLineRepository.findById(existingProduct.getProductLineId());
        List<Promotion> promotions = promotionRepository
                .findInUsePromotionsByCategoryId(productLine.getCategoryId());
        Long discount = promotions.stream()
                .map(Promotion::getValue)
                .reduce(0L, Long::sum);
        catalogItemDTO
                .setPrice(existingProduct.getBasePrice() > discount ? existingProduct.getBasePrice() - discount : 0L);

        return catalogItemDTO;
    }

    @Override
    public Page<CatalogItemDTO> search(ProductSearchCriteria criteria) {
        Page<Product> productPage = productRepository.search(criteria);
        Page<CatalogItemDTO> catalogPage = productPage.map(product -> {
            CatalogItemDTO catalogItemDTO = ProductAssembler.toCatalogItemDTO(product);

            Image image = imageRepository.findById(product.getImageId());
            if (image != null) {
                catalogItemDTO.setImage(image);
            } else {
                log.error("Image with id {} not found", product.getImageId());
                catalogItemDTO.setImage(null);
            }

            ProductLine productLine = productLineRepository.findById(product.getProductLineId());
            List<Promotion> promotions = promotionRepository
                    .findInUsePromotionsByCategoryId(productLine.getCategoryId());
            Long discount = promotions.stream()
                    .map(Promotion::getValue)
                    .reduce(0L, Long::sum);
            catalogItemDTO.setPrice(product.getBasePrice() > discount ? product.getBasePrice() - discount : 0L);

            return catalogItemDTO;
        });
        return catalogPage;
    }

    @Override
    public ProductAttributeDTO updateProductAttribute(ProductAttribute productAttribute) {
        ProductAttribute updatedProductAttribute = productRepository.updateProductAttribute(productAttribute);
        return ProductAttributeAssembler.toDTO(updatedProductAttribute);
    }

    @Override
    public List<ProductAttributeDTO> findProductAttributesByProductId(Long productId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'findProductAttributesByProductId'");
    }

    @Override
    public List<CatalogItemDTO> findByProductLineId(Long productLineId) {
        List<Product> products = productRepository.findByProductLineId(productLineId);
        return products.stream()
                .map(product -> {
                    CatalogItemDTO catalogItemDTO = ProductAssembler.toCatalogItemDTO(product);

                    Image image = imageRepository.findById(product.getImageId());
                    if (image != null) {
                        catalogItemDTO.setImage(image);
                    } else {
                        log.error("Image with id {} not found", product.getImageId());
                        catalogItemDTO.setImage(null);
                    }

                    ProductLine productLine = productLineRepository.findById(product.getProductLineId());
                    List<Promotion> promotions = promotionRepository
                            .findInUsePromotionsByCategoryId(productLine.getCategoryId());
                    Long discount = promotions.stream()
                            .map(Promotion::getValue)
                            .reduce(0L, Long::sum);
                    catalogItemDTO.setPrice(product.getBasePrice() > discount ? product.getBasePrice() - discount : 0L);

                    return catalogItemDTO;
                })
                .toList();
    }

    @Override
    public ReviewDTO createReview(Long reviewPermissionId, Long userId, Integer rating, String content) {
        ReviewPermission reviewPermission = reviewPermissionRepository.findById(reviewPermissionId);
        if (reviewPermission == null) {
            log.error("Review permission with id {} not found", reviewPermissionId);
            throw new AppException(ErrorCode.REVIEW_PERMISSION_NOT_FOUND);
        }
        if (reviewPermission.getUserId() != userId) {
            log.error("User {} is not allowed to review product {}", userId, reviewPermission.getProductId());
            throw new AppException(ErrorCode.REVIEW_PERMISSION_NOT_FOUND);
        }
        Review review = productService.createReview(reviewPermission, rating, content);

        User user = userRepository.findById(userId);
        UserDTO userDTO = UserAssembler.toDTO(user);

        ReviewDTO reviewDTO = ReviewAssembler.toDTO(review);
        reviewDTO.setUser(userDTO);

        return reviewDTO;
    }

    @Override
    public Page<ReviewDTO> searchReviews(ReviewSearchCriteria criteria) {
        Page<Review> reviewPage = productRepository.searchReviews(criteria);
        return reviewPage
                .map(review -> {
                    ReviewDTO reviewDTO = ReviewAssembler.toDTO(review);
                    User user = userRepository.findById(review.getUserId());
                    UserDTO userDTO = UserAssembler.toDTO(user);
                    reviewDTO.setUser(userDTO);
                    return reviewDTO;
                });
    }

}
