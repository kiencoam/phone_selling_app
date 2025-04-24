package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.variant.Variant;
import hust.phone_selling_app.infrastructure.persistence.model.VariantModel;

public class VariantAssembler {

    public static Variant toDomain(VariantModel model) {
        if (model == null) {
            return null;
        }
        return Variant.builder()
                .id(model.getId())
                .code(model.getCode())
                .color(model.getColor())
                .productId(model.getProductId())
                .build();
    }

    public static VariantModel toModel(Variant domain) {
        if (domain == null) {
            return null;
        }
        return VariantModel.builder()
                .id(domain.getId())
                .code(domain.getCode())
                .color(domain.getColor())
                .productId(domain.getProductId())
                .build();

    }

}