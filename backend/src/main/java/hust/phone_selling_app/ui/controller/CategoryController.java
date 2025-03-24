package hust.phone_selling_app.ui.controller;

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

import hust.phone_selling_app.core.domain.dto.request.CreateCategoryRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateCategoryRequestDto;
import hust.phone_selling_app.core.domain.entity.CategoryEntity;
import hust.phone_selling_app.core.service.ICategoryService;
import hust.phone_selling_app.ui.resource.Resource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/categories")
@RequiredArgsConstructor
@Slf4j
@Validated
public class CategoryController {

    private final ICategoryService categoryService;

    @PostMapping("")
    public ResponseEntity<Resource<CategoryEntity>> createCategory(
            @Valid @RequestBody CreateCategoryRequestDto request) {
        log.info("Create new category with name: {}", request.getName());
        CategoryEntity category = categoryService.save(request);
        return ResponseEntity.ok(new Resource<>(category));
    }

    @PutMapping("")
    public ResponseEntity<Resource<CategoryEntity>> updateCategory(
            @Valid @RequestBody UpdateCategoryRequestDto request) {
        log.info("Update category with id: {}", request.getId());
        CategoryEntity category = categoryService.update(request);
        return ResponseEntity.ok(new Resource<>(category));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Resource<?>> deleteCategory(@PathVariable Long id) {
        log.info("Delete category with id: {}", id);
        categoryService.deleteById(id);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Resource<CategoryEntity>> getCategoryById(@PathVariable Long id) {
        log.info("Get category with id: {}", id);
        CategoryEntity category = categoryService.findById(id);
        return ResponseEntity.ok(new Resource<>(category));
    }

    @GetMapping("")
    public ResponseEntity<Resource<List<CategoryEntity>>> getAllCategories() {
        log.info("Get all categories");
        return ResponseEntity.ok(new Resource<>(categoryService.findAll()));
    }

}
