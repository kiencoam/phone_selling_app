package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.dto.request.CreateCategoryRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateCategoryRequestDto;
import hust.phone_selling_app.core.domain.entity.CategoryEntity;

@Mapper
public abstract class CategoryMapper {

    public static final CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

    public abstract CategoryEntity toEntity(CreateCategoryRequestDto requestDto);

    public abstract CategoryEntity toEntity(UpdateCategoryRequestDto requestDto);

}
