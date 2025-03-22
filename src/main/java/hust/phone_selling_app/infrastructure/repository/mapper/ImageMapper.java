package hust.phone_selling_app.infrastructure.repository.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.infrastructure.repository.model.ImageModel;

@Mapper
public abstract class ImageMapper {

    public static final ImageMapper INSTANCE = Mappers.getMapper(ImageMapper.class);

    public abstract ImageEntity toEntity(ImageModel image);

    public abstract ImageModel toModel(ImageEntity image);

}
