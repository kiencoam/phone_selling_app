package hust.phone_selling_app.infrastructure.persistence.specification;

import java.util.ArrayList;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import hust.phone_selling_app.domain.shared.PromotionSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.model.PromotionModel;
import jakarta.persistence.criteria.Predicate;

public class PromotionSpecification {

    public static Specification<PromotionModel> satisfySearchCriteria(PromotionSearchCriteria criteria) {
        return (root, query, criteriaBuilder) -> {
            var predicate = new ArrayList<Predicate>();

            if (StringUtils.hasText(criteria.getKeyword())) {
                predicate.add(
                        criteriaBuilder.like(root.get("name"), "%" + criteria.getKeyword() + "%"));
            }

            if (criteria.getCategoryId() != null) {
                predicate.add(criteriaBuilder.equal(root.get("categoryId"), criteria.getCategoryId()));
            }

            if (criteria.getValueFrom() != null) {
                predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("value"), criteria.getValueFrom()));
            }

            if (criteria.getValueTo() != null) {
                predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("value"), criteria.getValueTo()));
            }

            if (criteria.getStartAfter() != null) {
                predicate.add(criteriaBuilder.greaterThanOrEqualTo(root.get("startDate"), criteria.getStartAfter()));
            }

            if (criteria.getEndBefore() != null) {
                predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("endDate"), criteria.getEndBefore()));
            }

            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        };

    }

}
