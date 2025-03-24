package hust.phone_selling_app.infrastructure.repository.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;
import hust.phone_selling_app.infrastructure.repository.model.ShippingInfoModel;

@Mapper
public abstract class ShippingInfoMapper {

    public static final ShippingInfoMapper INSTANCE = Mappers.getMapper(ShippingInfoMapper.class);

    public abstract ShippingInfoEntity toEntity(ShippingInfoModel model);

    public abstract ShippingInfoModel toModel(ShippingInfoEntity entity);

}
