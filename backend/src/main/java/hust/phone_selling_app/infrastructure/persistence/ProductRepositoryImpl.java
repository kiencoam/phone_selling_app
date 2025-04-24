package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import hust.phone_selling_app.domain.attribute.Attribute;
import hust.phone_selling_app.domain.attribute.AttributeRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductAttribute;
import hust.phone_selling_app.domain.product.ProductRepository;
import hust.phone_selling_app.domain.product.Review;
import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.productline.ProductLineRepository;
import hust.phone_selling_app.domain.shared.ProductSearchCriteria;
import hust.phone_selling_app.domain.shared.ReviewSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.assembler.ProductAssembler;
import hust.phone_selling_app.infrastructure.persistence.assembler.ProductAttributeAssembler;
import hust.phone_selling_app.infrastructure.persistence.assembler.ReviewAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.ProductAttributeRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.jpa.ProductRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.jpa.ReviewRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.ProductAttributeModel;
import hust.phone_selling_app.infrastructure.persistence.model.ProductModel;
import hust.phone_selling_app.infrastructure.persistence.model.ReviewModel;
import hust.phone_selling_app.infrastructure.persistence.specification.ReviewSpecification;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class ProductRepositoryImpl implements ProductRepository {

    private final ProductRepositoryJpa productRepository;
    private final ProductAttributeRepositoryJpa productAttributeRepository;
    private final ReviewRepositoryJpa reviewRepository;
    private final ProductLineRepository productLineRepository;
    private final AttributeRepository attributeRepository;

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Product create(Product product) {
        ProductModel productModel = ProductAssembler.toModel(product);
        productModel = productRepository.save(productModel);

        Long productId = productModel.getId();
        ProductLine productLine = productLineRepository.findById(product.getProductLineId());
        List<Attribute> attributes = attributeRepository.findAllByCategoryId(productLine.getCategoryId());
        attributes.forEach(attribute -> {
            ProductAttributeModel productAttributeModel = ProductAttributeModel.builder()
                    .attributeId(attribute.getId())
                    .productId(productId)
                    .build();
            productAttributeRepository.save(productAttributeModel);
        });
        return ProductAssembler.toDomain(productModel);
    }

    @Override
    public Product update(Product product) {
        ProductModel productModel = ProductAssembler.toModel(product);
        productModel = productRepository.save(productModel);
        return ProductAssembler.toDomain(productModel);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public void delete(Long id) {
        productRepository.deleteById(id);
        productAttributeRepository.deleteByProductId(id);
        reviewRepository.deleteByProductId(id);
    }

    @Override
    public Product findById(Long id) {
        ProductModel productModel = productRepository.findById(id).orElse(null);
        if (productModel == null) {
            log.info("Product not found with id: {}", id);
            return null;
        }

        List<ProductAttributeModel> productAttributeModels = productAttributeRepository.findByProductId(id);
        List<ProductAttribute> productAttributes = productAttributeModels.stream()
                .map(ProductAttributeAssembler::toDomain)
                .toList();

        Product product = ProductAssembler.toDomain(productModel);
        product.setProductAttributes(productAttributes);
        return product;
    }

    @Override
    public Page<Product> search(ProductSearchCriteria criteria) {
        Page<ProductModel> productModels = productRepository.search(criteria);
        return productModels.map(ProductAssembler::toDomain);
    }

    @Override
    public List<Product> findByProductLineId(Long productLineId) {
        List<ProductModel> productModels = productRepository.findByProductLineId(productLineId);
        return productModels.stream()
                .map(ProductAssembler::toDomain)
                .toList();
    }

    @Override
    public List<Product> findByCategoryId(Long categoryId) {
        List<ProductModel> productModels = productRepository.findByCategoryId(categoryId);
        return productModels.stream()
                .map(ProductAssembler::toDomain)
                .toList();
    }

    @Override
    public List<ProductAttribute> getAllProductAttributes(Long productId) {
        List<ProductAttributeModel> productAttributeModels = productAttributeRepository.findByProductId(productId);
        return productAttributeModels.stream()
                .map(ProductAttributeAssembler::toDomain)
                .toList();
    }

    @Override
    public ProductAttribute updateProductAttribute(ProductAttribute productAttribute) {
        ProductAttributeModel productAttributeModel = productAttributeRepository.findById(productAttribute.getId())
                .orElse(null);
        if (productAttributeModel == null) {
            log.error("ProductAttribute not found with id: {}", productAttribute.getId());
            throw new AppException(ErrorCode.ATTRIBUTE_VALUE_NOT_FOUND);
        }

        productAttributeModel.setValue(productAttribute.getValue());
        productAttributeModel = productAttributeRepository.save(productAttributeModel);
        return ProductAttributeAssembler.toDomain(productAttributeModel);
    }

    @Override
    public ProductAttribute createProductAttribute(Long attributeId, Long productId) {
        ProductAttributeModel productAttributeModel = ProductAttributeModel.builder()
                .attributeId(attributeId)
                .productId(productId)
                .build();
        productAttributeModel = productAttributeRepository.save(productAttributeModel);
        return ProductAttributeAssembler.toDomain(productAttributeModel);
    }

    @Override
    public ProductAttribute findProductAttributeById(Long id) {
        ProductAttributeModel productAttributeModel = productAttributeRepository.findById(id).orElse(null);
        return ProductAttributeAssembler.toDomain(productAttributeModel);
    }

    @Override
    public void deleteProductAttributeByAttributeId(Long attributeId) {
        productAttributeRepository.deleteByAttributeId(attributeId);
    }

    @Override
    @Transactional(rollbackFor = Exception.class)
    public Review addReview(Long productId, Review review) {
        ProductModel productModel = productRepository.findById(productId).orElse(null);
        if (productModel == null) {
            log.error("Product not found with id: {}", productId);
            throw new AppException(ErrorCode.PRODUCT_NOT_FOUND);
        }

        // Cap nhat rating va reviewsCount cho san pham
        Float rating = productModel.getRating();
        Integer reviewsCount = productModel.getReviewsCount();
        rating = (rating * reviewsCount + review.getRating()) / (reviewsCount + 1);
        reviewsCount += 1;
        productModel.setRating(rating);
        productModel.setReviewsCount(reviewsCount);
        productRepository.save(productModel);

        ReviewModel reviewModel = ReviewAssembler.toModel(review);
        reviewModel.setProductId(productId);
        return ReviewAssembler.toDomain(reviewRepository.save(reviewModel));
    }

    @Override
    public Page<Review> searchReviews(ReviewSearchCriteria criteria) {
        Pageable pageable = criteria.toPageable();
        Page<ReviewModel> reviewModels = reviewRepository
                .findAll(ReviewSpecification.satisfySearchCriteria(criteria), pageable);
        return reviewModels.map(ReviewAssembler::toDomain);
    }

}
