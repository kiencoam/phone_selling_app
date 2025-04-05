package hust.phone_selling_app.interfaces.variant.facade.internal.assembler;

import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.interfaces.variant.facade.dto.VariantDTO;

public class VariantAssembler {

    public static VariantDTO toDTO(Variant variant) {
        if (variant == null) {
            return null;
        }
        return VariantDTO.builder()
                .id(variant.getId())
                .code(variant.getCode())
                .color(variant.getColor())
                .productId(variant.getProductId())
                .inventory(variant.getInventory())
                .build();
    }

}
