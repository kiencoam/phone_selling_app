package hust.phone_selling_app.domain.order;

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
public class OrderItem {

    private Long id;

    private Long variantId;

    private String name;

    private String color;

    private String imageId;

    private Long price;

    private Integer quantity;

}
