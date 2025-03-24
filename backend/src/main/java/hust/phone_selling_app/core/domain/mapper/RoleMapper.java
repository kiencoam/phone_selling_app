package hust.phone_selling_app.core.domain.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.dto.request.CreateRoleRequestDto;
import hust.phone_selling_app.core.domain.entity.RoleEntity;

@Mapper
public abstract class RoleMapper {

    public static final RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

    public abstract RoleEntity toEntity(CreateRoleRequestDto dto);

}
