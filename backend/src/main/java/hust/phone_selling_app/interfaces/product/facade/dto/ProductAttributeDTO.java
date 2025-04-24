package hust.phone_selling_app.interfaces.product.facade.dto;

import hust.phone_selling_app.domain.attribute.Attribute;
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
public class ProductAttributeDTO {

    private Long id;

    private String value;

    private Attribute attribute;

}
