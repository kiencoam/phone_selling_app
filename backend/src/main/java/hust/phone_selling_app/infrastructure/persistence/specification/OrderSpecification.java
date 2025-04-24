package hust.phone_selling_app.infrastructure.persistence.specification;

import java.util.ArrayList;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import hust.phone_selling_app.domain.shared.OrderSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.model.OrderModel;
import jakarta.persistence.criteria.Predicate;

public class OrderSpecification {

    public static Specification<OrderModel> satisfySearchCriteria(OrderSearchCriteria searchCriteria) {
        return (root, query, criteriaBuilder) -> {
            var predicate = new ArrayList<Predicate>();

            if (StringUtils.hasText(searchCriteria.getReceiveName())) {
                predicate.add(
                        criteriaBuilder.like(root.get("receiveName"), "%" + searchCriteria.getReceiveName() + "%"));
            }

            if (StringUtils.hasText(searchCriteria.getPhone())) {
                predicate.add(criteriaBuilder.like(root.get("phone"), "%" + searchCriteria.getPhone() + "%"));
            }

            if (StringUtils.hasText(searchCriteria.getAddress())) {
                predicate.add(criteriaBuilder.like(root.get("address"), "%" + searchCriteria.getAddress() + "%"));
            }

            if (StringUtils.hasText(searchCriteria.getStatus())) {
                predicate.add(criteriaBuilder.equal(root.get("status"), searchCriteria.getStatus()));
            }

            if (searchCriteria.getOrderDateFrom() != null) {
                predicate.add(
                        criteriaBuilder.greaterThanOrEqualTo(root.get("createdAt"), searchCriteria.getOrderDateFrom()));
            }

            if (searchCriteria.getOrderDateTo() != null) {
                predicate
                        .add(criteriaBuilder.lessThanOrEqualTo(root.get("createdAt"), searchCriteria.getOrderDateTo()));
            }

            if (searchCriteria.getPriceFrom() != null) {
                predicate.add(
                        criteriaBuilder.greaterThanOrEqualTo(root.get("totalPrice"), searchCriteria.getPriceFrom()));
            }

            if (searchCriteria.getPriceTo() != null) {
                predicate.add(criteriaBuilder.lessThanOrEqualTo(root.get("totalPrice"), searchCriteria.getPriceTo()));
            }

            if (StringUtils.hasText(searchCriteria.getPaymentMethod())) {
                predicate.add(criteriaBuilder.equal(root.get("paymentMethod"), searchCriteria.getPaymentMethod()));
            }

            if (StringUtils.hasText(searchCriteria.getReceiveMethod())) {
                predicate.add(criteriaBuilder.equal(root.get("receiveMethod"), searchCriteria.getReceiveMethod()));
            }

            if (StringUtils.hasText(searchCriteria.getKeyword())) {
                predicate.add(criteriaBuilder.like(root.get("note"), "%" + searchCriteria.getKeyword() + "%"));
            }

            return criteriaBuilder.and(predicate.toArray(new Predicate[0]));
        };
    }

}
