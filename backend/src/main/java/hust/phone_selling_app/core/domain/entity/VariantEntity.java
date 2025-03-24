package hust.phone_selling_app.core.domain.entity;

import java.util.List;

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
public class VariantEntity {

    private Long id;

    private Long productId;

    private String color;

    private String status;

    private List<ImageEntity> images;

    private InventoryEntity inventory;

}
