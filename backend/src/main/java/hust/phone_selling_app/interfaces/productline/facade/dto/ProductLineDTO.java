package hust.phone_selling_app.interfaces.productline.facade.dto;

import hust.phone_selling_app.domain.brand.Brand;
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
public class ProductLineDTO {

    private Long id;

    private String name;

    private String code;

    private Category category;

    private Brand brand;

}
