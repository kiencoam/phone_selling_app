package hust.phone_selling_app.domain.user;

import java.util.List;

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
public class User {

    private Long id;
    private String fullName;
    private String email;
    private String password;
    private Boolean isActive;
    private Long roleId;

    private List<ShippingInfo> shippingInfos;
    private List<CartItem> cartItems;

}
