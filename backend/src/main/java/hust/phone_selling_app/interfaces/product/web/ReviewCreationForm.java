package hust.phone_selling_app.interfaces.product.web;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ReviewCreationForm {

    @NotNull(message = "Review permission ID cannot be null")
    private Long reviewPermissionId;

    @NotNull(message = "Product ID cannot be null")
    @Min(value = 1, message = "Rating must be greater than or equal to 1")
    @Max(value = 5, message = "Rating must be less than or equal to 5")
    private Integer rating;

    private String content;

}
