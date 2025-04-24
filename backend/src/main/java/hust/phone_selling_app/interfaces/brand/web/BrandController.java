package hust.phone_selling_app.interfaces.brand.web;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.domain.brand.Brand;
import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.interfaces.brand.facade.BrandServiceFacade;
import hust.phone_selling_app.interfaces.brand.facade.dto.BrandDTO;
import hust.phone_selling_app.interfaces.resource.Resource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/brand")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý nhãn hàng", description = "Phân quyền: STAFF")
public class BrandController {

    private final BrandServiceFacade brandServiceFacade;

    @Operation(summary = "Lấy danh sách tất cả nhãn hàng")
    @GetMapping("")
    public ResponseEntity<Resource<List<BrandDTO>>> getAllBrands() {
        log.info("Fetching all brands");

        List<BrandDTO> brands = brandServiceFacade.findAll();
        return ResponseEntity.ok(new Resource<>(brands));
    }

    @Operation(summary = "Tìm kiếm nhãn hàng theo tên")
    @GetMapping("/name")
    public ResponseEntity<Resource<List<BrandDTO>>> getBrandsByName(
            @RequestParam(required = false, defaultValue = "") String name) {
        log.info("Fetching brands by name: {}", name);

        List<BrandDTO> brands = brandServiceFacade.findByName(name);
        return ResponseEntity.ok(new Resource<>(brands));

    }

    @Operation(summary = "Lấy thông tin nhãn hàng theo ID")
    @GetMapping("/{id}")
    public ResponseEntity<Resource<BrandDTO>> getBrandById(@PathVariable Long id) {
        log.info("Fetching brand by id: {}", id);

        BrandDTO brand = brandServiceFacade.findById(id);
        return ResponseEntity.ok(new Resource<>(brand));
    }

    @Operation(summary = "Tạo mới nhãn hàng", description = "Ảnh chỉ cần chứa duy nhất trường base64")
    @PostMapping("")
    public ResponseEntity<Resource<BrandDTO>> createBrand(
            @Valid @RequestBody BrandCreationForm form) {
        log.info("Creating brand with name: {}", form.getName());

        Brand brand = Brand.builder()
                .name(form.getName())
                .build();

        Image image = form.getImage();

        BrandDTO savedBrand = brandServiceFacade.save(brand, image);
        return ResponseEntity.ok(new Resource<>(savedBrand));
    }

    @Operation(summary = "Cập nhật nhãn hàng", description = "Nếu là ảnh mới: Chỉ truyền duy nhất trường base64 \n" +
            "Nếu là ảnh cũ: Chỉ truyền id của ảnh cũ")
    @PutMapping()
    public ResponseEntity<Resource<BrandDTO>> updateBrand(
            @Valid @RequestBody BrandUpdateForm form) {
        log.info("Updating brand with name: {}", form.getName());

        Brand brand = Brand.builder()
                .id(form.getId())
                .name(form.getName())
                .build();

        Image image = form.getImage();

        BrandDTO updatedBrand = brandServiceFacade.save(brand, image);
        return ResponseEntity.ok(new Resource<>(updatedBrand));
    }

    @Operation(summary = "Xóa nhãn hàng")
    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> deleteBrand(@PathVariable Long id) {
        log.info("Deleting brand with id: {}", id);

        brandServiceFacade.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

}
