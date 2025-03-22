package hust.phone_selling_app.core.port;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.CategoryEntity;

public interface ICategoryPort {

    public CategoryEntity save(CategoryEntity categoryEntity);

    public CategoryEntity update(CategoryEntity categoryEntity);

    public void deleteById(Long id);

    public CategoryEntity findById(Long id);

    public List<CategoryEntity> findAll();

}
