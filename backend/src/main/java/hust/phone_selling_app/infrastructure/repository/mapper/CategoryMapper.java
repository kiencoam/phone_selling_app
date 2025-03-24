package hust.phone_selling_app.infrastructure.repository.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.entity.CategoryEntity;
import hust.phone_selling_app.infrastructure.repository.model.CategoryModel;

@Mapper
public abstract class CategoryMapper {

    public static final CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    public abstract CategoryEntity toEntity(CategoryModel model);

    public abstract CategoryModel toModel(CategoryEntity entity);

}
