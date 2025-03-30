package hust.phone_selling_app.application.impl;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.application.CategoryService;
import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.domain.category.CategoryRepository;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    @Override
    public void deleteCategory(Category category) {
        // Kiem tra category co con mat hang nao khong
        // Xoa attribute
        categoryRepository.delete(category.getId());
    }

}
