package hust.phone_selling_app.infrastructure.repository.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import hust.phone_selling_app.core.domain.entity.RoleEntity;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.infrastructure.repository.model.UserModel;

@Mapper
public abstract class UserMapper {

    public static final UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

    public UserEntity toEntity(UserModel user) {
        if (user == null) {
            return null;
        }

        return UserEntity.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .password(user.getPassword())
                .isActive(user.getIsActive())
                .role(RoleEntity.builder().id(user.getRoleId()).build())
                .build();
    }

    public UserModel toModel(UserEntity user) {
        if (user == null) {
            return null;
        }

        return UserModel.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .password(user.getPassword())
                .isActive(user.getIsActive())
                .roleId(user.getRole().getId())
                .build();
    }

}
