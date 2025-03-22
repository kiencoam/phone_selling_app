package hust.phone_selling_app.core.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Pattern;
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
public class ChangeUserPasswordRequestDto {

    @NotNull(message = "New password cannot be null")
    @Pattern(regexp = "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{8,}$", message = "New password must contain at least 8 characters, including at least one uppercase letter, one lowercase letter, and one number")
    private String newPassword;

    private String oldPassword;

}
