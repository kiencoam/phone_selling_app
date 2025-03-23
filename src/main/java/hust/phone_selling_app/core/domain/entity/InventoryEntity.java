package hust.phone_selling_app.core.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class InventoryEntity {

    private Long id;

    private Long variantId;

    private Long sold;

    private Long available;

}
