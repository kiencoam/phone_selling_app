package hust.phone_selling_app.interfaces.variant.web;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AvailableUpdateForm {

    @NotNull(message = "Variant ID is required")
    private Long variantId;

    @NotNull(message = "Available is required")
    @Min(value = 0, message = "Available must be greater than or equal to 0")
    private Long available;

}
