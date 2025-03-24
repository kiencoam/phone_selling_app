package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.dto.request.CreateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;

@Mapper
public abstract class ShippingInfoMapper {

    public static final ShippingInfoMapper INSTANCE = Mappers.getMapper(ShippingInfoMapper.class);

    public abstract ShippingInfoEntity toEntity(CreateShippingInfoRequestDto dto);

}
