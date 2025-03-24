package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.constant.ProductStatus;
import hust.phone_selling_app.core.domain.dto.request.CreateProductRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateProductRequestDto;
import hust.phone_selling_app.core.domain.entity.ProductEntity;
import hust.phone_selling_app.core.domain.entity.ProductLineEntity;

@Mapper
public class ProductMapper {

    public static ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

    public ProductEntity toEntity(CreateProductRequestDto dto) {
        return ProductEntity.builder()
                .name(dto.getName())
                .code(dto.getCode())
                .description(dto.getDescription())
                .basePrice(dto.getBasePrice())
                .status(ProductStatus.INACTIVE.value())
                .productLine(ProductLineEntity.builder().id(dto.getProductLineId()).build())
                .build();
    }

    public ProductEntity toEntity(UpdateProductRequestDto dto) {
        return ProductEntity.builder()
                .name(dto.getName())
                .code(dto.getCode())
                .description(dto.getDescription())
                .basePrice(dto.getBasePrice())
                .build();
    }

}
