package hust.phone_selling_app.core.domain.dto.response;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.AttributeEntity;
import hust.phone_selling_app.core.domain.entity.ProductLineEntity;
import hust.phone_selling_app.core.domain.entity.PromotionEntity;
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
public class ProductDetailResponseDto {

    private Long id;

    private String name;

    private String code;

    private String description;

    private ProductLineEntity productLine;

    private VariantResponseDto variant;

    private Integer rating;

    private List<PromotionEntity> promotions;

    private Long basePrice;

    private Long discountPrice;

    private String status;

    private List<AttributeEntity> attributes;

}
