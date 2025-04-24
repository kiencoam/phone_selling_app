package hust.phone_selling_app.interfaces.user.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class ShippingInfoAddForm {

    @NotNull(message = "phone cannot be null")
    @Pattern(regexp = "^0[0-9]{9}$", message = "phone must be a valid phone number")
    private String phone;

    @NotBlank(message = "address cannot be blank")
    private String address;

    @NotBlank(message = "receiveName cannot be blank")
    private String receiveName;

}
