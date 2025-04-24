package hust.phone_selling_app.infrastructure.persistence.specification;

import java.util.ArrayList;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import hust.phone_selling_app.domain.shared.LineSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.model.ProductLineModel;
import jakarta.persistence.criteria.Predicate;

public class ProductLineSpecification {

    public static Specification<ProductLineModel> satisfySearchCriteria(LineSearchCriteria searchCriteria) {
        return (root, query, criteriaBuilder) -> {
            var predicate = new ArrayList<Predicate>();

            if (StringUtils.hasText(searchCriteria.getKeyword())) {
                predicate.add(criteriaBuilder.or(
                        criteriaBuilder.like(root.get("name"), "%" + searchCriteria.getKeyword() + "%"),
                        criteriaBuilder.like(root.get("code"), "%" + searchCriteria.getKeyword() + "%")));
            }
            if (searchCriteria.getCategoryId() != null) {
                predicate.add(criteriaBuilder.equal(root.get("categoryId"), searchCriteria.getCategoryId()));
            }
            if (searchCriteria.getBrandId() != null) {
                predicate.add(criteriaBuilder.equal(root.get("brandId"), searchCriteria.getBrandId()));
            }

            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        };
    }

}
