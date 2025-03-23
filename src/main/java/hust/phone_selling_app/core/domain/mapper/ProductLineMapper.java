package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
import hust.phone_selling_app.core.domain.dto.request.CreateProductLineRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateProductLineRequestDto;
import hust.phone_selling_app.core.domain.entity.BrandEntity;
import hust.phone_selling_app.core.domain.entity.CategoryEntity;
import hust.phone_selling_app.core.domain.entity.ProductLineEntity;

@Mapper
public abstract class ProductLineMapper {

    public static ProductLineMapper INSTANCE = Mappers.getMapper(ProductLineMapper.class);

    public ProductLineEntity toEntity(CreateProductLineRequestDto request) {
        return ProductLineEntity.builder()
                .name(request.getName())
                .code(request.getCode())
                .category(CategoryEntity.builder().id(request.getCategoryId()).build())
                .brand(BrandEntity.builder().id(request.getBrandId()).build())
                .build();
    }

    public ProductLineEntity toEntity(UpdateProductLineRequestDto request) {
        return ProductLineEntity.builder()
                .id(request.getId())
                .name(request.getName())
                .code(request.getCode())
                .category(CategoryEntity.builder().id(request.getCategoryId()).build())
                .brand(BrandEntity.builder().id(request.getBrandId()).build())
                .build();
    }

}
