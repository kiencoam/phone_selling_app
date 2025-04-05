package hust.phone_selling_app.interfaces.variant.web;

import java.util.List;

import hust.phone_selling_app.domain.image.Image;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VariantCreationForm {

    @NotBlank(message = "Code is required")
    private String code;

    @NotBlank(message = "Color is required")
    private String color;

    @NotNull(message = "Product ID is required")
    private Long productId;

    @NotEmpty(message = "At least one image must be provided")
    List<Image> images;

    @NotNull(message = "Inventory is required")
    @Min(value = 0, message = "Inventory must be greater than or equal to 0")
    private Long available;

}
