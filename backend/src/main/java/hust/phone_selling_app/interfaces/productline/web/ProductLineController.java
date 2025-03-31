package hust.phone_selling_app.interfaces.productline.web;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.domain.shared.LineSearchCriteria;
import hust.phone_selling_app.interfaces.productline.facade.ProductLineServiceFacade;
import hust.phone_selling_app.interfaces.productline.facade.dto.ProductLineDTO;
import hust.phone_selling_app.interfaces.resource.Resource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/product-line")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý dòng sản phẩm", description = "Phân quyền: STAFF")
public class ProductLineController {

    private final ProductLineServiceFacade productLineServiceFacade;

    @Operation(summary = "Tạo mới dòng sản phẩm")
    @PostMapping("")
    public ResponseEntity<Resource<ProductLineDTO>> createProductLine(
            @Valid @RequestBody ProductLineCreationForm form) {
        log.info("Creating new product line with name: {}", form.getName());

        ProductLine productLine = ProductLine.builder()
                .name(form.getName())
                .code(form.getCode())
                .brandId(form.getBrandId())
                .categoryId(form.getCategoryId())
                .build();

        ProductLineDTO productLineDTO = productLineServiceFacade.create(productLine);
        return ResponseEntity.ok(new Resource<>(productLineDTO));
    }

    @Operation(summary = "Cập nhật dòng sản phẩm")
    @PutMapping("")
    public ResponseEntity<Resource<ProductLineDTO>> updateProductLine(
            @Valid @RequestBody ProductLineUpdateForm form) {
        log.info("Updating product line with ID: {}", form.getId());

        ProductLine productLine = ProductLine.builder()
                .id(form.getId())
                .name(form.getName())
                .code(form.getCode())
                .brandId(form.getBrandId())
                .categoryId(form.getCategoryId())
                .build();

        ProductLineDTO productLineDTO = productLineServiceFacade.update(productLine);
        return ResponseEntity.ok(new Resource<>(productLineDTO));
    }

    @Operation(summary = "Xóa dòng sản phẩm")
    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<Void>> deleteProductLine(@PathVariable Long id) {
        log.info("Deleting product line with ID: {}", id);

        productLineServiceFacade.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @Operation(summary = "Lấy thông tin dòng sản phẩm")
    @GetMapping("/{id}")
    public ResponseEntity<Resource<ProductLineDTO>> getProductLine(@PathVariable Long id) {
        log.info("Getting product line with ID: {}", id);

        ProductLineDTO productLineDTO = productLineServiceFacade.findById(id);
        return ResponseEntity.ok(new Resource<>(productLineDTO));
    }

    @Operation(summary = "Tìm kiếm dòng sản phẩm")
    @GetMapping("/search")
    public ResponseEntity<Resource<Page<ProductLineDTO>>> searchProductLine(
            @RequestParam(required = false, defaultValue = "1") Integer page,
            @RequestParam(required = false, defaultValue = "10") Integer size,
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(required = false, defaultValue = "createdAt") String sortBy,
            @RequestParam(required = false, defaultValue = "desc") String sortDir,
            @RequestParam(required = false) Long categoryId,
            @RequestParam(required = false) Long brandId) {
        log.info("Searching product lines");

        LineSearchCriteria searchCriteria = LineSearchCriteria.builder()
                .page(page - 1)
                .size(size)
                .keyword(keyword)
                .sortBy(sortBy)
                .sortDir(sortDir)
                .categoryId(categoryId)
                .brandId(brandId)
                .build();

        Page<ProductLineDTO> productLineDTOs = productLineServiceFacade.search(searchCriteria);
        return ResponseEntity.ok(new Resource<>(productLineDTOs));

    }
}
