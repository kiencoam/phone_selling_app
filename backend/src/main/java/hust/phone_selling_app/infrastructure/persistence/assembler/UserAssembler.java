package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.infrastructure.persistence.model.UserModel;

public class UserAssembler {

    public static UserModel toModel(User user) {
        if (user == null) {
            return null;
        }

        return UserModel.builder()
                .id(user.getId())
                .fullName(user.getFullName())
                .email(user.getEmail())
                .password(user.getPassword())
                .isActive(user.getIsActive())
                .roleId(user.getRoleId())
                .build();
    }

    public static User toDomain(UserModel userModel) {
        if (userModel == null) {
            return null;
        }

        return User.builder()
                .id(userModel.getId())
                .fullName(userModel.getFullName())
                .email(userModel.getEmail())
                .password(userModel.getPassword())
                .isActive(userModel.getIsActive())
                .roleId(userModel.getRoleId())
                .build();
    }

}
