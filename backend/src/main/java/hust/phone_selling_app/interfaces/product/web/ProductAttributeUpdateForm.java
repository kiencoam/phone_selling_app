package hust.phone_selling_app.interfaces.product.web;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductAttributeUpdateForm {

    @NotNull(message = "ID is required")
    private Long id;

    private String value;

}
