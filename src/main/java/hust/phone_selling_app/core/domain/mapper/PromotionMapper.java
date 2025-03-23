package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.dto.request.CreatePromotionRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdatePromotionRequestDto;
import hust.phone_selling_app.core.domain.entity.PromotionEntity;

@Mapper
public abstract class PromotionMapper {

    public static PromotionMapper INSTANCE = Mappers.getMapper(PromotionMapper.class);

    public abstract PromotionEntity toEntity(CreatePromotionRequestDto requestDto);

    public abstract PromotionEntity toEntity(UpdatePromotionRequestDto requestDto);

}
