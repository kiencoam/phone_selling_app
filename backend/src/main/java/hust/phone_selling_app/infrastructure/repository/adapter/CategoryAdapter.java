package hust.phone_selling_app.infrastructure.repository.adapter;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.CategoryEntity;
import hust.phone_selling_app.core.port.ICategoryPort;
import hust.phone_selling_app.infrastructure.repository.ICategoryRepository;
import hust.phone_selling_app.infrastructure.repository.mapper.CategoryMapper;
import hust.phone_selling_app.infrastructure.repository.model.CategoryModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryAdapter implements ICategoryPort {

    private final ICategoryRepository categoryRepository;

    @Override
    public CategoryEntity save(CategoryEntity categoryEntity) {
        CategoryModel model = CategoryMapper.INSTANCE.toModel(categoryEntity);
        return CategoryMapper.INSTANCE.toEntity(categoryRepository.save(model));
    }

    @Override
    public CategoryEntity update(CategoryEntity categoryEntity) {
        CategoryModel model = CategoryMapper.INSTANCE.toModel(categoryEntity);
        return CategoryMapper.INSTANCE.toEntity(categoryRepository.save(model));
    }

    @Override
    public void deleteById(Long id) {
        categoryRepository.deleteById(id);
    }

    @Override
    public CategoryEntity findById(Long id) {
        CategoryModel model = categoryRepository.findById(id).orElse(null);
        return CategoryMapper.INSTANCE.toEntity(model);
    }

    @Override
    public List<CategoryEntity> findAll() {
        List<CategoryModel> models = categoryRepository.findAll();
        return models.stream().map(CategoryMapper.INSTANCE::toEntity).toList();
    }

}
