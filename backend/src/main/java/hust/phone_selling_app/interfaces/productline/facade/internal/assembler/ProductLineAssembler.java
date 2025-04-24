package hust.phone_selling_app.interfaces.productline.facade.internal.assembler;

import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.interfaces.productline.facade.dto.ProductLineDTO;

public class ProductLineAssembler {

    public static ProductLineDTO toDTO(ProductLine productLine) {
        if (productLine == null) {
            return null;
        }
        return ProductLineDTO.builder()
                .id(productLine.getId())
                .name(productLine.getName())
                .code(productLine.getCode())
                .build();
    }

}
