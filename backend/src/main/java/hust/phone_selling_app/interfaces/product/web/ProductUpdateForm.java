package hust.phone_selling_app.interfaces.product.web;

import hust.phone_selling_app.domain.image.Image;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductUpdateForm {

    @NotNull(message = "ID is required")
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Code is required")
    private String code;

    private String description;

    @NotNull(message = "Base price is required")
    @Min(value = 0, message = "Base price must be greater than or equal to 0")
    private Long basePrice;

    @NotNull(message = "Image is required")
    private Image image;

}
