package hust.phone_selling_app.interfaces.variant.facade.dto;

import java.util.List;

import hust.phone_selling_app.domain.image.Image;
import hust.phone_selling_app.domain.variant.Inventory;
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
public class VariantDTO {

    private Long id;

    private String code;

    private String color;

    private Long productId;

    List<Image> images;

    private Inventory inventory;

}
