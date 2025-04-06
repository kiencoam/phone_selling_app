package hust.phone_selling_app.interfaces.user.facade.internal.assembler;

import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.interfaces.user.facade.dto.VariantDTO;

public class VariantAssembler {

    public static VariantDTO toDTO(Variant variant) {
        return VariantDTO.builder()
                .id(variant.getId())
                .color(variant.getColor())
                .inventory(variant.getInventory())
                .build();
    }

}
