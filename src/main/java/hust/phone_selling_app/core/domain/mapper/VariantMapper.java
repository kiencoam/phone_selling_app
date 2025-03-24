package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.constant.ProductStatus;
import hust.phone_selling_app.core.domain.dto.request.CreateVariantRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateVariantRequestDto;
import hust.phone_selling_app.core.domain.entity.VariantEntity;

@Mapper
public abstract class VariantMapper {

    public static VariantMapper INSTANCE = Mappers.getMapper(VariantMapper.class);

    public VariantEntity toEntity(CreateVariantRequestDto request) {
        return VariantEntity.builder()
                .productId(request.getProductId())
                .color(request.getColor())
                .status(ProductStatus.INACTIVE.value())
                .build();
    }

    public VariantEntity toEntity(UpdateVariantRequestDto request) {
        return VariantEntity.builder()
                .id(request.getId())
                .color(request.getColor())
                .build();
    }

}
