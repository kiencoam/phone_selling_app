package hust.phone_selling_app.domain.product;

import java.util.List;

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
public class Product {

    private Long id;
    private String name;
    private String code;
    private String description;
    private Long basePrice;
    private String imageId;
    private Long productLineId;
    private Float rating;
    private Integer reviewsCount;
    private List<ProductAttribute> productAttributes;

    private List<Review> reviews;

}
