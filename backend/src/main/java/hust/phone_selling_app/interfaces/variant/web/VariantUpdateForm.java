package hust.phone_selling_app.interfaces.variant.web;

import java.util.List;

import hust.phone_selling_app.domain.image.Image;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VariantUpdateForm {

    @NotNull(message = "ID is required")
    private Long id;

    @NotBlank(message = "Code is required")
    private String code;

    @NotBlank(message = "Color is required")
    private String color;

    List<Image> images;

}
