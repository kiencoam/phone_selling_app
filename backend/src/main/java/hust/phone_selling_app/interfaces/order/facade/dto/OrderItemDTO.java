package hust.phone_selling_app.interfaces.order.facade.dto;

import hust.phone_selling_app.domain.image.Image;
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
public class OrderItemDTO {

    private Long id;

    private Long variantId;

    private String name;

    private String color;

    private Image image;

    private Long price;

    private Integer quantity;

}
