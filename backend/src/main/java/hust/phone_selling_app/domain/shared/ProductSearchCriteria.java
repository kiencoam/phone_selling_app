package hust.phone_selling_app.domain.shared;

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
public class ProductSearchCriteria {

    private Integer page;

    private Integer size;

    private String sortBy;

    private String sortDir;

    private String keyword;

    private Long categoryId;

    private Long brandId;

    private Long priceFrom;

    private Long priceTo;

    private Integer ratingFrom;

}
