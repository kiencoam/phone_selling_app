package hust.phone_selling_app.infrastructure.repository.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.entity.RoleEntity;
import hust.phone_selling_app.infrastructure.repository.model.RoleModel;

@Mapper
public abstract class RoleMapper {

    public static final RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

    public abstract RoleEntity toEntity(RoleModel role);

    public abstract RoleModel toModel(RoleEntity role);

}
