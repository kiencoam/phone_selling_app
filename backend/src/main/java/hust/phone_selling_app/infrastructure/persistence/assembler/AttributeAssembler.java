package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.attribute.Attribute;
import hust.phone_selling_app.infrastructure.persistence.model.AttributeModel;

public class AttributeAssembler {

    public static Attribute toDomain(AttributeModel attributeModel) {
        if (attributeModel == null) {
            return null;
        }
        return Attribute.builder()
                .id(attributeModel.getId())
                .name(attributeModel.getName())
                .categoryId(attributeModel.getCategoryId())
                .build();
    }

    public static AttributeModel toModel(Attribute attribute) {
        if (attribute == null) {
            return null;
        }
        return AttributeModel.builder()
                .id(attribute.getId())
                .name(attribute.getName())
                .categoryId(attribute.getCategoryId())
                .build();
    }

}
