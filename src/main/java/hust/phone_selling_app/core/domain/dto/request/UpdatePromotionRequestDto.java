package hust.phone_selling_app.core.domain.dto.request;

import java.time.Instant;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdatePromotionRequestDto {

    @NotNull(message = "Id is required")
    private Long id;

    @NotBlank(message = "Name is required")
    private String name;

    @NotNull(message = "Value is required")
    @Min(value = 0, message = "Value must be greater or equal to 0")
    private Long value;

    private Instant startDate;

    private Instant endDate;

}
