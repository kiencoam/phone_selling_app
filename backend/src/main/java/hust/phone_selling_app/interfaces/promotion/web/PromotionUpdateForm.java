package hust.phone_selling_app.interfaces.promotion.web;

import java.time.Instant;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PromotionUpdateForm {

    @NotNull(message = "Promotion ID is required")
    private Long id;

    @NotBlank(message = "Promotion name is required")
    private String name;

    @NotNull(message = "Promotion value is required")
    @Min(value = 0, message = "Promotion value must be greater than or equal to 0")
    private Long value;

    @NotNull(message = "Start date is required")
    private Instant startDate;

    @NotNull(message = "End date is required")
    private Instant endDate;

    @NotNull(message = "Category ID is required")
    private Long categoryId;

}
