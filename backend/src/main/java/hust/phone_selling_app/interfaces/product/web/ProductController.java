package hust.phone_selling_app.interfaces.product.web;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.domain.product.ProductAttribute;
import hust.phone_selling_app.domain.shared.ProductSearchCriteria;
import hust.phone_selling_app.domain.shared.ReviewSearchCriteria;
import hust.phone_selling_app.infrastructure.utils.JwtUtils;
import hust.phone_selling_app.interfaces.product.facade.ProductServiceFacade;
import hust.phone_selling_app.interfaces.product.facade.dto.CatalogItemDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ProductAttributeDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ProductDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ReviewDTO;
import hust.phone_selling_app.interfaces.resource.Resource;
import io.swagger.v3.oas.annotations.Operation;

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/product")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý mặt hàng", description = "Phân quyền: STAFF, CUSTOMER")
public class ProductController {

    private final ProductServiceFacade productServiceFacade;
    private final JwtUtils jwtUtils;

    @Operation(summary = "Lấy thông tin mặt hàng")
    @GetMapping("/{id}")
    public ResponseEntity<Resource<ProductDTO>> getProductById(@PathVariable Long id) {
        log.info("Get product by id: {}", id);

        ProductDTO productDTO = productServiceFacade.findById(id);
        return ResponseEntity.ok(new Resource<>(productDTO));
    }

    @Operation(summary = "Tìm kiếm mặt hàng", description = "sortBy: {createdAt, name, basePrice}; sortDir: {asc, desc}")
    @GetMapping("/search")
    public ResponseEntity<Resource<Page<CatalogItemDTO>>> searchProduct(
            @Min(1) @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortDir,
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false) Long brandId,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long priceFrom,
            @RequestParam(required = false) Long priceTo,
            @RequestParam(required = false) Integer ratingFrom) {
        log.info("Search product");

        ProductSearchCriteria searchCriteria = ProductSearchCriteria.builder()
                .page(page - 1)
                .size(size)
                .sortBy(sortBy)
                .sortDir(sortDir)
                .keyword(keyword)
                .brandId(brandId)
                .categoryId(categoryId)
                .priceFrom(priceFrom)
                .priceTo(priceTo)
                .ratingFrom(ratingFrom)
                .build();
        Page<CatalogItemDTO> catalog = productServiceFacade.search(searchCriteria);
        return ResponseEntity.ok(new Resource<>(catalog));
    }

    @Operation(summary = "Tạo mới mặt hàng", description = "Ảnh chỉ cần chứa duy nhất trường base64")
    @PostMapping("")
    public ResponseEntity<Resource<ProductDTO>> createProduct(@Valid @RequestBody ProductCreationForm form) {
        log.info("Creating new product with name: {}", form.getName());

        Product product = Product.builder()
                .name(form.getName())
                .code(form.getCode())
                .description(form.getDescription())
                .basePrice(form.getBasePrice())
                .productLineId(form.getProductLineId())
                .build();

        ProductDTO productDTO = productServiceFacade.create(product, form.getImage());
        return ResponseEntity.ok(new Resource<>(productDTO));
    }

    @Operation(summary = "Sửa thông tin mặt hàng", description = "Nếu là ảnh mới: Chỉ truyền duy nhất trường base64 \n"
            +
            "Nếu là ảnh cũ: Chỉ truyền id của ảnh cũ")
    @PutMapping("")
    public ResponseEntity<Resource<ProductDTO>> updateProduct(@Valid @RequestBody ProductUpdateForm form) {
        log.info("Updating product with ID: {}", form.getId());

        Product product = Product.builder()
                .id(form.getId())
                .name(form.getName())
                .code(form.getCode())
                .description(form.getDescription())
                .basePrice(form.getBasePrice())
                .build();

        ProductDTO productDTO = productServiceFacade.update(product, form.getImage());
        return ResponseEntity.ok(new Resource<>(productDTO));
    }

    @Operation(summary = "Xóa mặt hàng")
    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> deleteProduct(@PathVariable Long id) {
        log.info("Deleting product with ID: {}", id);

        productServiceFacade.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @Operation(summary = "Sửa giá trị thuộc tính sản phẩm")
    @PutMapping("/attribute")
    public ResponseEntity<Resource<ProductAttributeDTO>> updateProductAttribute(
            @Valid @RequestBody ProductAttributeUpdateForm form) {
        log.info("Updating product attribute with ID: {}", form.getId());

        ProductAttribute productAttribute = ProductAttribute.builder()
                .id(form.getId())
                .value(form.getValue())
                .build();

        ProductAttributeDTO productAttributeDTO = productServiceFacade.updateProductAttribute(productAttribute);
        return ResponseEntity.ok(new Resource<>(productAttributeDTO));
    }

    @Operation(summary = "Lấy danh sách mặt hàng thuộc dòng sản phẩm")
    @GetMapping("/product-line/{productLineId}")
    public ResponseEntity<Resource<List<CatalogItemDTO>>> getProductByProductLineId(
            @PathVariable Long productLineId) {
        log.info("Get product by product line ID: {}", productLineId);

        List<CatalogItemDTO> items = productServiceFacade.findByProductLineId(productLineId);
        return ResponseEntity.ok(new Resource<>(items));
    }

    @Operation(summary = "Lấy danh sách bài đánh giá của sản phẩm")
    @GetMapping("/{productId}/review")
    public ResponseEntity<Resource<Page<ReviewDTO>>> getReviewsByProductId(
            @PathVariable Long productId,
            @Min(1) @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortDir,
            @RequestParam(required = false) Integer rating) {
        log.info("Get reviews by product ID: {}", productId);

        ReviewSearchCriteria criteria = ReviewSearchCriteria.builder()
                .productId(productId)
                .page(page - 1)
                .size(size)
                .sortBy(sortBy)
                .sortDir(sortDir)
                .rating(rating)
                .build();
        Page<ReviewDTO> reviews = productServiceFacade.searchReviews(criteria);

        return ResponseEntity.ok(new Resource<>(reviews));
    }

    @Operation(summary = "Tạo mới bài đánh giá")
    @PostMapping("/review")
    public ResponseEntity<Resource<ReviewDTO>> createReview(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody ReviewCreationForm form) {
        log.info("Creating new review for review permission with id: {}", form.getReviewPermissionId());

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        ReviewDTO reviewDTO = productServiceFacade.createReview(form.getReviewPermissionId(), userId, form.getRating(),
                form.getContent());

        return ResponseEntity.ok(new Resource<>(reviewDTO));
    }

}
