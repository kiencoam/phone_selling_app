package hust.phone_selling_app.core.domain.dto.response;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.ImageEntity;
import hust.phone_selling_app.core.domain.entity.InventoryEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class VariantResponseDto {

    private Long id;

    private String color;

    private List<ImageEntity> images;

    private InventoryEntity inventory;

}
