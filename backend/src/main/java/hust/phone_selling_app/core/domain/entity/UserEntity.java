package hust.phone_selling_app.core.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class UserEntity {
    private Long id;
    private String fullName;
    private String email;
    private String password;
    private Boolean isActive;
    private RoleEntity role;
}
