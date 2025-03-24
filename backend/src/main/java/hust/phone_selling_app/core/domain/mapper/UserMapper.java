package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.dto.request.CreateCustomerRequestDto;
import hust.phone_selling_app.core.domain.dto.request.CreateUserRequestDto;
import hust.phone_selling_app.core.domain.entity.UserEntity;

@Mapper
public abstract class UserMapper {

    public static final UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    public abstract UserEntity toEntity(CreateUserRequestDto dto);

    public abstract UserEntity toEntity(CreateCustomerRequestDto dto);

}
