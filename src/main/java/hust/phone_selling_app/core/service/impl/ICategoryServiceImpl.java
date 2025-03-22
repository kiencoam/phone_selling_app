package hust.phone_selling_app.core.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.dto.request.CreateCategoryRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateCategoryRequestDto;
import hust.phone_selling_app.core.domain.entity.CategoryEntity;
import hust.phone_selling_app.core.service.ICategoryService;
import hust.phone_selling_app.core.usecase.CreateCategoryUsecase;
import hust.phone_selling_app.core.usecase.DeleteCategoryUsecase;
import hust.phone_selling_app.core.usecase.GetCategoryUsecase;
import hust.phone_selling_app.core.usecase.UpdateCategoryUsecase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ICategoryServiceImpl implements ICategoryService {

    private final CreateCategoryUsecase createCategoryUsecase;
    private final UpdateCategoryUsecase updateCategoryUsecase;
    private final DeleteCategoryUsecase deleteCategoryUsecase;
    private final GetCategoryUsecase getCategoryUsecase;

    @Override
    public CategoryEntity save(CreateCategoryRequestDto categoryEntity) {
        return createCategoryUsecase.create(categoryEntity);
    }

    @Override
    public CategoryEntity update(UpdateCategoryRequestDto categoryEntity) {
        return updateCategoryUsecase.update(categoryEntity);
    }

    @Override
    public void deleteById(Long id) {
        deleteCategoryUsecase.delete(id);
    }

    @Override
    public CategoryEntity findById(Long id) {
        return getCategoryUsecase.findById(id);
    }

    @Override
    public List<CategoryEntity> findAll() {
        return getCategoryUsecase.findAll();
    }

}
