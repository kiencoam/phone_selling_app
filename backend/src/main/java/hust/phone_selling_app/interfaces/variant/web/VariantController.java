package hust.phone_selling_app.interfaces.variant.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.domain.variant.Inventory;
import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.interfaces.resource.Resource;
import hust.phone_selling_app.interfaces.variant.facade.VariantServiceFacade;
import hust.phone_selling_app.interfaces.variant.facade.dto.VariantDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/variant")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý các biến thể của sản phẩm", description = "Phân quyền: STAFF")
public class VariantController {

    private final VariantServiceFacade variantServiceFacade;

    @Operation(summary = "Lấy danh sách các biến thể của sản phẩm")
    @GetMapping("/product/{productId}")
    public ResponseEntity<Resource<List<VariantDTO>>> getVariantsByProductId(@PathVariable Long productId) {
        log.info("Get variants by product id: {}", productId);
        List<VariantDTO> variants = variantServiceFacade.findByProductId(productId);
        return ResponseEntity.ok(new Resource<>(variants));
    }

    @Operation(summary = "Lấy thông tin biến thể")
    @GetMapping("/{id}")
    public ResponseEntity<Resource<VariantDTO>> getVariantById(@PathVariable Long id) {
        log.info("Get variant by id: {}", id);
        VariantDTO variant = variantServiceFacade.findById(id);
        return ResponseEntity.ok(new Resource<>(variant));
    }

    @Operation(summary = "Tạo mới biến thể", description = "Hình ảnh chỉ cần chứa base64 và isPrimary (Ảnh chính của biến thể)")
    @PostMapping("")
    public ResponseEntity<Resource<VariantDTO>> createVariant(@Valid @RequestBody VariantCreationForm form) {
        log.info("Create variant of product {} with color: {}", form.getProductId(), form.getColor());

        Variant variant = Variant.builder()
                .code(form.getCode())
                .color(form.getColor())
                .productId(form.getProductId())
                .inventory(Inventory.builder()
                        .available(form.getAvailable())
                        .build())
                .build();

        VariantDTO createdVariant = variantServiceFacade.create(variant, form.getImages());
        return ResponseEntity.ok(new Resource<>(createdVariant));
    }

    @Operation(summary = "Xóa biến thể")
    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> deleteVariant(@PathVariable Long id) {
        log.info("Delete variant with id: {}", id);
        variantServiceFacade.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @Operation(summary = "Sửa thông tin biến thể", description = "Chỉ cần đưa vào ảnh mới (ảnh mới chỉ cần chứa base64 và isPrimary)")
    @PutMapping("")
    public ResponseEntity<Resource<VariantDTO>> updateVariant(@Valid @RequestBody VariantUpdateForm form) {
        log.info("Update variant with id: {}", form.getId());

        Variant variant = Variant.builder()
                .id(form.getId())
                .code(form.getCode())
                .color(form.getColor())
                .build();

        if (form.getImages() == null) {
            form.setImages(List.of());
        }

        VariantDTO updatedVariant = variantServiceFacade.update(variant, form.getImages());
        return ResponseEntity.ok(new Resource<>(updatedVariant));
    }

    @Operation(summary = "Cập nhật số lượng tồn kho của biến thể")
    @PutMapping("/available")
    public ResponseEntity<Resource<Inventory>> updateAvailable(@Valid @RequestBody AvailableUpdateForm form) {
        log.info("Update available of variant with id: {}", form.getVariantId());
        Inventory inventory = variantServiceFacade.updateAvailable(form.getVariantId(), form.getAvailable());
        return ResponseEntity.ok(new Resource<>(inventory));
    }

}
