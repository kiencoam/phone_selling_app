package hust.phone_selling_app.core.domain.dto.request;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class UpdateCategoryRequestDto {

    @NotNull(message = "Id is required")
    private Long id;

    @NotNull(message = "Name is required")
    private String name;

}
