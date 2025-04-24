package hust.phone_selling_app.interfaces.category.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryUpdateForm {

    @NotNull(message = "Category ID is required")
    private Long id;

    @NotBlank(message = "Category name is required")
    private String name;

}
