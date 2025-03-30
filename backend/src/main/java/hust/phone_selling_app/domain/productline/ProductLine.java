package hust.phone_selling_app.domain.productline;

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
public class ProductLine {

    private Long id;

    private String name;

    private String code;

    private Long categoryId;

    private Long brandId;

}
