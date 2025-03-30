package hust.phone_selling_app.interfaces.auth.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StaffLoginForm {

    @NotBlank(message = "Email is required")
    private String email;

    @NotNull(message = "Password is required")
    private String password;

}
