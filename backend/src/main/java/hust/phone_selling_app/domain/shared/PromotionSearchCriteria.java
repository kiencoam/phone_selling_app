package hust.phone_selling_app.domain.shared;

import java.time.Instant;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

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
public class PromotionSearchCriteria {

    private Integer page;

    private Integer size;

    private String sortBy;

    private String sortDir;

    private String keyword;

    private Long categoryId;

    private Long valueFrom;

    private Long valueTo;

    private Instant startAfter;

    private Instant endBefore;

    public Pageable toPageable() {
        return PageRequest.of(page, size,
                sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending());
    }

}
