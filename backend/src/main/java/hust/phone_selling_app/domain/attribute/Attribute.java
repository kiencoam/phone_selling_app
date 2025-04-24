package hust.phone_selling_app.domain.attribute;

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
public class Attribute {

    private Long id;

    private String name;

    private Long categoryId;

}
