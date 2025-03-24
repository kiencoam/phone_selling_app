package hust.phone_selling_app.infrastructure.repository.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.entity.BrandEntity;
import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.infrastructure.repository.model.BrandModel;

@Mapper
public abstract class BrandMapper {

    public static final BrandMapper INSTANCE = Mappers.getMapper(BrandMapper.class);

    public BrandModel toModel(BrandEntity brandEntity) {
        BrandModel model = BrandModel.builder()
                .id(brandEntity.getId())
                .name(brandEntity.getName())
                .build();

        if (brandEntity.getImage() != null) {
            model.setImageId(brandEntity.getImage().getId());
        }

        return model;
    }

    public BrandEntity toEntity(BrandModel brandModel) {
        BrandEntity entity = BrandEntity.builder()
                .id(brandModel.getId())
                .name(brandModel.getName())
                .build();

        if (brandModel.getImageId() != null) {
            entity.setImage(ImageEntity.builder().id(brandModel.getImageId()).build());
        }

        return entity;
    }

}
