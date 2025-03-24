package hust.phone_selling_app.core.domain.entity;

import java.time.Instant;

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
public class PromotionEntity {

    private Long id;

    private String name;

    private Long value;

    private Instant startDate;

    private Instant endDate;

}
