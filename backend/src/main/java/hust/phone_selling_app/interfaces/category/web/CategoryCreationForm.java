package hust.phone_selling_app.interfaces.category.web;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CategoryCreationForm {

    @NotBlank(message = "Category name is required")
    private String name;

}
