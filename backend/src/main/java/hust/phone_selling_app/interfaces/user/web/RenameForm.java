package hust.phone_selling_app.interfaces.user.web;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class RenameForm {

    @NotBlank(message = "Full name is required")
    private String fullName;

}
