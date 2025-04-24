package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.product.Review;
import hust.phone_selling_app.infrastructure.persistence.model.ReviewModel;

public class ReviewAssembler {

    public static Review toDomain(ReviewModel reviewModel) {
        if (reviewModel == null) {
            return null;
        }
        return Review.builder()
                .id(reviewModel.getId())
                .userId(reviewModel.getUserId())
                .rating(reviewModel.getRating())
                .content(reviewModel.getContent())
                .createdAt(reviewModel.getCreatedAt())
                .build();
    }

    public static ReviewModel toModel(Review review) {
        if (review == null) {
            return null;
        }
        ReviewModel model = ReviewModel.builder()
                .id(review.getId())
                .userId(review.getUserId())
                .rating(review.getRating())
                .content(review.getContent())
                .build();
        model.setCreatedAt(review.getCreatedAt());
        return model;
    }

}
