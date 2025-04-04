package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.product.ProductAttribute;
import hust.phone_selling_app.infrastructure.persistence.model.ProductAttributeModel;

public class ProductAttributeAssembler {

    public static ProductAttribute toDomain(ProductAttributeModel model) {
        if (model == null) {
            return null;
        }
        return ProductAttribute.builder()
                .id(model.getId())
                .attributeId(model.getAttributeId())
                .value(model.getValue())
                .build();
    }

    public static ProductAttributeModel toModel(ProductAttribute domain) {
        if (domain == null) {
            return null;
        }
        return ProductAttributeModel.builder()
                .id(domain.getId())
                .attributeId(domain.getAttributeId())
                .value(domain.getValue())
                .build();
    }

}
