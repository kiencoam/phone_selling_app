package hust.phone_selling_app.core.domain.dto.response;

import hust.phone_selling_app.core.domain.entity.ImageEntity;
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
public class ProductThumbnailResponseDto {

    private Long id;

    private String name;

    private String code;

    private ImageEntity image;

    private Long basePrice;

    private Long discountPrice;

    private Integer rating;

    private Long sold;

    private String status;

}
