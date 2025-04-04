package hust.phone_selling_app.interfaces.attribute.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeCreationForm {

    @NotBlank(message = "Attribute name is required")
    String name;

    @NotNull(message = "Category ID is required")
    Long categoryId;

}
