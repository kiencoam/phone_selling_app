package hust.phone_selling_app.core.domain.dto.request;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.ImageEntity;
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
public class CreateVariantRequestDto {

    @NotNull(message = "Product id is required")
    private Long productId;

    @NotBlank(message = "Color is required")
    private String color;

    @NotNull(message = "Image list is required")
    private List<ImageEntity> images;

    @NotNull(message = "Available is required")
    private Long available;

}
