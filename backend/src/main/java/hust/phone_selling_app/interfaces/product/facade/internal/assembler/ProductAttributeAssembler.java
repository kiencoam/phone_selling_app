package hust.phone_selling_app.interfaces.product.facade.internal.assembler;

import hust.phone_selling_app.domain.product.ProductAttribute;
import hust.phone_selling_app.interfaces.product.facade.dto.ProductAttributeDTO;

public class ProductAttributeAssembler {

    public static ProductAttributeDTO toDTO(ProductAttribute productAttribute) {
        if (productAttribute == null) {
            return null;
        }
        return ProductAttributeDTO.builder()
                .id(productAttribute.getId())
                .value(productAttribute.getValue())
                .build();
    }

}
