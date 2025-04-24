package hust.phone_selling_app.interfaces.brand.facade.dto;

import hust.phone_selling_app.domain.image.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class BrandDTO {

    private Long id;

    private String name;

    private Image image;

}
