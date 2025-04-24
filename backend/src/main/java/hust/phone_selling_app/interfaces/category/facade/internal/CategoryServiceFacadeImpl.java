package hust.phone_selling_app.interfaces.category.facade.internal;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.CategoryService;
import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.domain.category.CategoryRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.interfaces.category.facade.CategoryServiceFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CategoryServiceFacadeImpl implements CategoryServiceFacade {

    private final CategoryService categoryService;
    private final CategoryRepository categoryRepository;

    @Override
    public Category save(Category category) {
        return categoryRepository.save(category);
    }

    @Override
    public void delete(Long id) {
        Category category = categoryRepository.findById(id);
        if (category == null) {
            log.info("Category with id {} not found", id);
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }
        categoryService.deleteCategory(category);
    }

    @Override
    public Category findById(Long id) {
        Category category = categoryRepository.findById(id);
        if (category == null) {
            log.info("Category with id {} not found", id);
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }
        return category;
    }

    @Override
    public List<Category> findAll() {
        List<Category> categories = categoryRepository.findAll();
        return categories;
    }

    @Override
    public List<Category> findByName(String name) {
        List<Category> categories = categoryRepository.search(name);
        return categories;
    }

}
