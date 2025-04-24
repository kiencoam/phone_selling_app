package hust.phone_selling_app.domain.variant;

import java.util.List;

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
public class Variant {

    private Long id;

    private String code;

    private String color;

    private Long productId;

    List<String> imageIds;

    private Inventory inventory;

}
