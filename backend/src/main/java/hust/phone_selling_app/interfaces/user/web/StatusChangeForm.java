package hust.phone_selling_app.interfaces.user.web;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class StatusChangeForm {

    @NotNull(message = "User ID cannot be null")
    private Long id;

    @NotNull(message = "Status cannot be null")
    private Boolean isActive;

}
