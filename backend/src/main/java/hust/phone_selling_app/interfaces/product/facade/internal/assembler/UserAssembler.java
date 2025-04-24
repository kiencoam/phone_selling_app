package hust.phone_selling_app.interfaces.product.facade.internal.assembler;

import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.interfaces.product.facade.dto.UserDTO;

public class UserAssembler {

    public static UserDTO toDTO(User user) {
        if (user == null) {
            return null;
        }
        return UserDTO.builder()
                .id(user.getId())
                .email(user.getEmail())
                .fullName(user.getFullName())
                .build();
    }

}
