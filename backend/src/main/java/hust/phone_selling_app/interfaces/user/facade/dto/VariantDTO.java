package hust.phone_selling_app.interfaces.user.facade.dto;

import hust.phone_selling_app.domain.variant.Inventory;
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
public class VariantDTO {

    private Long id;

    private String color;

    private Inventory inventory;

}
