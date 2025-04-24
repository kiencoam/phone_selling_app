package hust.phone_selling_app.interfaces.promotion.facade.dto;

import hust.phone_selling_app.domain.category.Category;
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
public class PromotionDTO {

    private Long id;
    private String name;
    private Long value;
    private String startDate;
    private String endDate;
    private Category category;

}
