package hust.phone_selling_app.core.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ShippingInfoEntity {

    private Long id;

    private Long customerId;

    private String phone;

    private String address;

    private String receiveName;

}
