package hust.phone_selling_app.infrastructure.persistence.specification;

import java.util.ArrayList;

import org.springframework.data.jpa.domain.Specification;
import hust.phone_selling_app.domain.shared.ReviewSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.model.ReviewModel;
import jakarta.persistence.criteria.Predicate;

public class ReviewSpecification {

    public static Specification<ReviewModel> satisfySearchCriteria(ReviewSearchCriteria searchCriteria) {
        return (root, query, criteriaBuilder) -> {
            var predicate = new ArrayList<Predicate>();

            predicate.add(criteriaBuilder.equal(root.get("productId"), searchCriteria.getProductId()));

            if (searchCriteria.getRating() != null) {
                predicate.add(criteriaBuilder.equal(root.get("rating"), searchCriteria.getRating()));
            }

            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        };
    }

}
