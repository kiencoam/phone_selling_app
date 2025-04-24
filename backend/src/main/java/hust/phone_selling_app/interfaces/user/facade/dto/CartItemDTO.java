package hust.phone_selling_app.interfaces.user.facade.dto;

import hust.phone_selling_app.interfaces.product.facade.dto.CatalogItemDTO;
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
public class CartItemDTO {

    private Long id;

    private Integer quantity;

    private CatalogItemDTO catalogItem;

    private VariantDTO variant;

}
