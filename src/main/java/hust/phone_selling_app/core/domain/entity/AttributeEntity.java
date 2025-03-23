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
public class AttributeEntity {

    private Long id;

    private String name;

    private Long productId;

    private String value;

    private GroupEntity group;

}
