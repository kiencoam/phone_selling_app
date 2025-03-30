package hust.phone_selling_app.interfaces.category.web;

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

import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.interfaces.category.facade.CategoryServiceFacade;
import hust.phone_selling_app.interfaces.resource.Resource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/category")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Quản lý danh mục sản phẩm", description = "Phân quyền: STAFF")
public class CategoryController {

    private final CategoryServiceFacade categoryServiceFacade;

    @Operation(summary = "Lấy danh sách danh mục sản phẩm")
    @GetMapping()
    public ResponseEntity<Resource<List<Category>>> getAllCategories() {
        log.info("Get all categories");

        List<Category> categories = categoryServiceFacade.findAll();
        return ResponseEntity.ok(new Resource<>(categories));
    }

    @Operation(summary = "Tra cứu danh sách danh mục sản phẩm theo tên")
    @GetMapping("/name")
    public ResponseEntity<Resource<List<Category>>> getCategoriesByName(
            @RequestParam String name) {
        log.info("Get categories by name: {}", name);

        List<Category> categories = categoryServiceFacade.findByName(name);
        return ResponseEntity.ok(new Resource<>(categories));
    }

    @Operation(summary = "Lấy danh mục sản phẩm theo id")
    @GetMapping("/{id}")
    public ResponseEntity<Resource<Category>> getCategoryById(@PathVariable Long id) {
        log.info("Get category by id: {}", id);

        Category category = categoryServiceFacade.findById(id);
        return ResponseEntity.ok(new Resource<>(category));
    }

    @Operation(summary = "Tạo mới danh mục sản phẩm")
    @PostMapping()
    public ResponseEntity<Resource<Category>> createCategory(@Valid @RequestBody CategoryCreationForm form) {
        log.info("Create category: {}", form.getName());

        Category category = Category.builder()
                .name(form.getName())
                .build();
        category = categoryServiceFacade.save(category);
        return ResponseEntity.ok(new Resource<>(category));
    }

    @Operation(summary = "Cập nhật danh mục sản phẩm")
    @PutMapping()
    public ResponseEntity<Resource<Category>> updateCategory(@Valid @RequestBody CategoryUpdateForm form) {
        log.info("Update category: {}", form.getName());

        Category category = Category.builder()
                .id(form.getId())
                .name(form.getName())
                .build();
        category = categoryServiceFacade.save(category);
        return ResponseEntity.ok(new Resource<>(category));
    }

    @Operation(summary = "Xóa danh mục sản phẩm")
    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> deleteCategory(@PathVariable Long id) {
        log.info("Delete category with id: {}", id);

        categoryServiceFacade.delete(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

}
