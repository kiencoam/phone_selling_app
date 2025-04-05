package hust.phone_selling_app.domain.variant;

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
public class Inventory {

    private Long id;

    private Long available;

    private Long sold;

}
