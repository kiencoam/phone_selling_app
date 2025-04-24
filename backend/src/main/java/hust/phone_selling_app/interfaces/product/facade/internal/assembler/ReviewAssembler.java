package hust.phone_selling_app.interfaces.product.facade.internal.assembler;

import hust.phone_selling_app.domain.product.Review;
import hust.phone_selling_app.interfaces.product.facade.dto.ReviewDTO;

public class ReviewAssembler {

    public static ReviewDTO toDTO(Review review) {
        if (review == null) {
            return null;
        }
        return ReviewDTO.builder()
                .id(review.getId())
                .rating(review.getRating())
                .content(review.getContent())
                .createdAt(review.getCreatedAt())
                .build();
    }

}
