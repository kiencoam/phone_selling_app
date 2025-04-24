package hust.phone_selling_app.interfaces.product.facade.dto;

import java.util.List;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.interfaces.productline.facade.dto.ProductLineDTO;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductDTO {

    private Long id;

    private String name;

    private String code;

    private String description;

    private Long basePrice;

    private Float rating;

    private Integer reviewsCount;

    private Image image;

    private ProductLineDTO productLine;

    private List<Promotion> promotions;

    private List<ProductAttributeDTO> attributes;

    private Long price;

}
