package hust.phone_selling_app.interfaces.attribute.web;

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

import hust.phone_selling_app.domain.attribute.Attribute;
import hust.phone_selling_app.interfaces.attribute.facade.AttributeServiceFacade;
import hust.phone_selling_app.interfaces.resource.Resource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/attribute")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý thuộc tính sản phẩm", description = "Phân quyền: STAFF")
public class AttributeController {

    private final AttributeServiceFacade attributeServiceFacade;

    @Operation(summary = "Lấy danh sách thuộc tính của một danh mục sản phẩm")
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Resource<List<Attribute>>> getAttributesByCategoryId(@PathVariable Long categoryId) {
        log.info("Find all attributes belong to category id {}", categoryId);

        List<Attribute> attributes = attributeServiceFacade.findAllByCategoryId(categoryId);
        return ResponseEntity.ok(new Resource<>(attributes));
    }

    @Operation(summary = "Lấy thông tin một thuộc tính")
    @GetMapping("/{id}")
    public ResponseEntity<Resource<Attribute>> getAttributeById(@PathVariable Long id) {
        log.info("Find attribute by id {}", id);

        Attribute attribute = attributeServiceFacade.findById(id);
        return ResponseEntity.ok(new Resource<>(attribute));
    }

    @Operation(summary = "Tạo mới một thuộc tính")
    @PostMapping()
    public ResponseEntity<Resource<Attribute>> createAttribute(@Valid @RequestBody AttributeCreationForm form) {
        log.info("Create new attribute name {}", form.getName());

        Attribute attribute = new Attribute(
                null,
                form.getName(),
                form.getCategoryId());

        Attribute createdAttribute = attributeServiceFacade.create(attribute);
        return ResponseEntity.ok(new Resource<>(createdAttribute));
    }

    @Operation(summary = "Sửa đổi thông tin một thuộc tính")
    @PutMapping()
    public ResponseEntity<Resource<Attribute>> updateAttribute(@Valid @RequestBody AttributeUpdateForm form) {
        log.info("Update attribute id {}", form.getId());

        Attribute attribute = new Attribute(
                form.getId(),
                form.getName(),
                null);

        Attribute updatedAttribute = attributeServiceFacade.update(attribute);
        return ResponseEntity.ok(new Resource<>(updatedAttribute));
    }

    @Operation(summary = "Xóa một thuộc tính")
    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<Void>> deleteAttribute(@PathVariable Long id) {
        log.info("Delete attribute id {}", id);

        attributeServiceFacade.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

}
