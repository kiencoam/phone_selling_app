package hust.phone_selling_app.domain.reviewpermission;

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
public class ReviewPermission {

    private Long id;

    private Long userId;

    private Long productId;

}
