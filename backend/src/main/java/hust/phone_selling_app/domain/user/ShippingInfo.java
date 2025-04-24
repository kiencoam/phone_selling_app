package hust.phone_selling_app.domain.user;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Setter
@Getter
@Builder
public class ShippingInfo {

    private Long id;

    private String phone;

    private String address;

    private String receiveName;

}
