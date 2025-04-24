package hust.phone_selling_app.interfaces.productline.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductLineCreationForm {

    @NotBlank(message = "Product line name cannot be blank")
    private String name;

    @NotBlank(message = "Product line code cannot be blank")
    private String code;

    @NotNull(message = "Brand ID cannot be null")
    private Long brandId;

    @NotNull(message = "Category ID cannot be null")
    private Long categoryId;

}
