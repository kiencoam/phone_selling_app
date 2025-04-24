package hust.phone_selling_app.interfaces.user.web;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CartItemAddForm {

    @NotNull(message = "Variant ID cannot be null")
    private Long variantId;

    @NotNull(message = "Quantity cannot be null")
    @Min(value = 1, message = "Quantity must be at least 1")
    private Integer quantity;

}
