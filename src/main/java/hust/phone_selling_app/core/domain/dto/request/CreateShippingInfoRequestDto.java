package hust.phone_selling_app.core.domain.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class CreateShippingInfoRequestDto {

    private Long customerId;

    @NotNull(message = "Phone is required")
    @Pattern(regexp = "0[0-9]{9}", message = "Phone is invalid")
    private String phone;

    @NotBlank(message = "Address is required")
    private String address;

    @NotBlank(message = "Receive name is required")
    private String receiveName;

}
