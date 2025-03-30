package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.productline.ProductLine;
import hust.phone_selling_app.infrastructure.persistence.model.ProductLineModel;

public class ProductLineAssembler {

    public static ProductLineModel toModel(ProductLine productLine) {
        if (productLine == null) {
            return null;
        }
        return ProductLineModel.builder()
                .id(productLine.getId())
                .name(productLine.getName())
                .code(productLine.getCode())
                .categoryId(productLine.getCategoryId())
                .brandId(productLine.getBrandId())
                .build();
    }

    public static ProductLine toDomain(ProductLineModel productLineModel) {
        if (productLineModel == null) {
            return null;
        }
        return ProductLine.builder()
                .id(productLineModel.getId())
                .name(productLineModel.getName())
                .code(productLineModel.getCode())
                .categoryId(productLineModel.getCategoryId())
                .brandId(productLineModel.getBrandId())
                .build();
    }
}
