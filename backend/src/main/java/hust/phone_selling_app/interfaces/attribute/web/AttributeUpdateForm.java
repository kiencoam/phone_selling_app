package hust.phone_selling_app.interfaces.attribute.web;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AttributeUpdateForm {

    @NotNull(message = "Attribute ID is required")
    private Long id;

    @NotBlank(message = "Attribute name is required")
    private String name;

}
