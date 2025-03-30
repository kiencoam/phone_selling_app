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
@Setter
@Getter
public class UserUpdateForm {

    @NotNull(message = "ID cannot be null")
    private Long id;

    @NotBlank(message = "Full name is required")
    private String fullName;

    @NotNull(message = "Password is required")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", message = "Password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number")
    private String password;

}
