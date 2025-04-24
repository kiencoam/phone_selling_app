package hust.phone_selling_app.interfaces.product.facade.dto;

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

}
