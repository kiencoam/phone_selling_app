package hust.phone_selling_app.interfaces.product.facade.internal.assembler;

import hust.phone_selling_app.domain.product.Product;
import hust.phone_selling_app.interfaces.product.facade.dto.CatalogItemDTO;
import hust.phone_selling_app.interfaces.product.facade.dto.ProductDTO;

public class ProductAssembler {

    public static ProductDTO toDTO(Product product) {
        if (product == null) {
            return null;
        }
        return ProductDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .code(product.getCode())
                .description(product.getDescription())
                .basePrice(product.getBasePrice())
                .rating(product.getRating())
                .reviewsCount(product.getReviewsCount())
                .build();
    }

    public static CatalogItemDTO toCatalogItemDTO(Product product) {
        if (product == null) {
            return null;
        }
        return CatalogItemDTO.builder()
                .id(product.getId())
                .name(product.getName())
                .basePrice(product.getBasePrice())
                .rating(product.getRating())
                .reviewsCount(product.getReviewsCount())
                .build();
    }

}
