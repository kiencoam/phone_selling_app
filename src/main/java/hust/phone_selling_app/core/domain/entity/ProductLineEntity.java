package hust.phone_selling_app.core.domain.entity;

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
public class ProductLineEntity {

    private Long id;

    private String name;

    private String code;

    private BrandEntity brand;

    private CategoryEntity category;

}
