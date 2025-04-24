package hust.phone_selling_app.interfaces.product.facade.dto;

import hust.phone_selling_app.domain.image.Image;
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
public class CatalogItemDTO {

    private Long id;

    private String name;

    private Image image;

    private Long basePrice;

    private Float rating;

    private Integer reviewsCount;

    private Long price;

}
