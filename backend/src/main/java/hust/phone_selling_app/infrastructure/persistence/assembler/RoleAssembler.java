package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.role.Role;
import hust.phone_selling_app.infrastructure.persistence.model.RoleModel;

public class RoleAssembler {

    public static RoleModel toModel(Role role) {
        if (role == null) {
            return null;
        }

        return RoleModel.builder()
                .id(role.getId())
                .code(role.getCode())
                .name(role.getName())
                .build();
    }

    public static Role toDomain(RoleModel roleModel) {
        if (roleModel == null) {
            return null;
        }

        return Role.builder()
                .id(roleModel.getId())
                .code(roleModel.getCode())
                .name(roleModel.getName())
                .build();
    }

}
