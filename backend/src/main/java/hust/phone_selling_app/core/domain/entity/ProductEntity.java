package hust.phone_selling_app.core.domain.entity;

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
public class ProductEntity {

    private Long id;

    private String name;

    private String code;

    private String description;

    private String status;

    private ImageEntity image;

    private ProductLineEntity productLine;

    private Long basePrice;

    private List<AttributeEntity> attributes;

    private List<PromotionEntity> promotions;

}
