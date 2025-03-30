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
public class SearchCriteria {

    private Integer page;

    private Integer size;

    private String sortBy;

    private String sortDir;

    private String keyword;

    private Long categoryId;

    private Long brandId;

    private Long priceFrom;

    private Long priceTo;

    public Pageable toPageable() {
        return PageRequest.of(page, size,
                sortDir.equalsIgnoreCase("desc") ? Sort.by(sortBy).descending() : Sort.by(sortBy).ascending());
    }

}
