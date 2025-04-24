package hust.phone_selling_app.infrastructure.persistence;

import java.util.List;

import org.springframework.stereotype.Component;

import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.domain.category.CategoryRepository;
import hust.phone_selling_app.infrastructure.persistence.assembler.CategoryAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.CategoryRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.CategoryModel;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CategoryRepositoryImpl implements CategoryRepository {

    private final CategoryRepositoryJpa categoryRepository;

    @Override
    public Category save(Category category) {
        CategoryModel categoryModel = CategoryAssembler.toModel(category);
        return CategoryAssembler.toDomain(categoryRepository.save(categoryModel));
    }

    @Override
    public void delete(Long categoryId) {
        categoryRepository.deleteById(categoryId);
    }

    @Override
    public Category findById(Long categoryId) {
        CategoryModel categoryModel = categoryRepository.findById(categoryId).orElse(null);
        return CategoryAssembler.toDomain(categoryModel);
    }

    @Override
    public List<Category> search(String keyword) {
        List<CategoryModel> categoryModels = categoryRepository.findByNameContaining(keyword);
        return categoryModels.stream()
                .map(CategoryAssembler::toDomain)
                .toList();
    }

    @Override
    public List<Category> findAll() {
        List<CategoryModel> categoryModels = categoryRepository.findAll();
        return categoryModels.stream()
                .map(CategoryAssembler::toDomain)
                .toList();
    }

}
