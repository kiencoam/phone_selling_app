package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.dto.request.CreateBrandRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateBrandRequestDto;
import hust.phone_selling_app.core.domain.entity.BrandEntity;

@Mapper
public abstract class BrandMapper {

    public static final BrandMapper INSTANCE = Mappers.getMapper(BrandMapper.class);

    public abstract BrandEntity toEntity(CreateBrandRequestDto request);

    public abstract BrandEntity toEntity(UpdateBrandRequestDto request);

}
