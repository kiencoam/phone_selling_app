package hust.phone_selling_app.domain.shared;

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
public class ReviewSearchCriteria {

    private Integer page;

    private Integer size;

    private String sortBy;

    private String sortDir;

    private Long productId;

    private Integer rating;

    public Pageable toPageable() {
        return PageRequest.of(page, size,
                sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending());
    }

}
