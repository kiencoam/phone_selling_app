package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.infrastructure.persistence.model.ProductModel;

public class ProductAssembler {

    public static Product toDomain(ProductModel productModel) {
        if (productModel == null) {
            return null;
        }
        return Product.builder()
                .id(productModel.getId())
                .name(productModel.getName())
                .code(productModel.getCode())
                .description(productModel.getDescription())
                .basePrice(productModel.getBasePrice())
                .rating(productModel.getRating())
                .reviewsCount(productModel.getReviewsCount())
                .imageId(productModel.getImageId())
                .productLineId(productModel.getProductLineId())
                .build();
    }

    public static ProductModel toModel(Product product) {
        if (product == null) {
            return null;
        }
        return ProductModel.builder()
                .id(product.getId())
                .name(product.getName())
                .code(product.getCode())
                .description(product.getDescription())
                .basePrice(product.getBasePrice())
                .rating(product.getRating())
                .reviewsCount(product.getReviewsCount())
                .imageId(product.getImageId())
                .productLineId(product.getProductLineId())
                .build();
    }

}
