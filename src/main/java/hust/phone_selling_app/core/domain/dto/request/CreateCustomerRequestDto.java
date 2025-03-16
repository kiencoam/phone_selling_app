package hust.phone_selling_app.core.domain.dto.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
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
public class CreateCustomerRequestDto {

    @Email(message = "Email is invalid")
    private String email;

    @NotBlank(message = "Full name is required")
    private String full_name;

    @Min(value = 8, message = "Password must be at least 8 characters")
    private String password;
}
