package hust.phone_selling_app.core.domain.dto.request;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.AttributeEntity;
import hust.phone_selling_app.core.domain.entity.ImageEntity;
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
public class CreateProductRequestDto {

    @NotBlank(message = "Name is required")
    private String name;

    @NotBlank(message = "Code is required")
    private String code;

    @NotNull(message = "Product line is required")
    private Long productLineId;

    @NotBlank(message = "Description is required")
    private String description;

    private ImageEntity image;

    @NotNull(message = "Base price is required")
    @Min(value = 1000, message = "Base price must be greater than 1000")
    private Long basePrice;

    @NotNull(message = "Attributes is required")
    private List<AttributeEntity> attributes;

    @NotNull(message = "Promotions is required")
    private List<Long> promotionIds;

}
