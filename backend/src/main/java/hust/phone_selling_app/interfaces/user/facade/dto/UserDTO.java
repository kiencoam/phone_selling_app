package hust.phone_selling_app.interfaces.user.facade.dto;

import java.util.List;

import hust.phone_selling_app.domain.role.Role;
import hust.phone_selling_app.domain.user.ShippingInfo;
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
public class UserDTO {

    private Long id;

    private String email;

    private String fullName;

    private Boolean isActive;

    private Role role;

    private List<ShippingInfo> shippingInfos;

}
