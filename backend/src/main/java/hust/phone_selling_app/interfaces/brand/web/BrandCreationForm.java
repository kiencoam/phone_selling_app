package hust.phone_selling_app.interfaces.brand.web;

import hust.phone_selling_app.domain.image.Image;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class BrandCreationForm {

    @NotBlank(message = "Brand name is required")
    private String name;

    @NotNull(message = "Image is required")
    private Image image;

}
