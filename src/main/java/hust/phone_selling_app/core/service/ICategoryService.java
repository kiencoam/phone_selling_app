package hust.phone_selling_app.core.service;

import java.util.List;

import hust.phone_selling_app.core.domain.dto.request.CreateCategoryRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateCategoryRequestDto;
import hust.phone_selling_app.core.domain.entity.CategoryEntity;

public interface ICategoryService {

    public CategoryEntity save(CreateCategoryRequestDto categoryEntity);

    public CategoryEntity update(UpdateCategoryRequestDto categoryEntity);

    public void deleteById(Long id);

    public CategoryEntity findById(Long id);

    public List<CategoryEntity> findAll();

}
