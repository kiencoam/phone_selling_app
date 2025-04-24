package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.infrastructure.persistence.model.PromotionModel;

public class PromotionAssembler {

    public static Promotion toDomain(PromotionModel model) {
        if (model == null) {
            return null;
        }
        return new Promotion(
                model.getId(),
                model.getName(),
                model.getValue(),
                model.getStartDate(),
                model.getEndDate(),
                model.getCategoryId());
    }

    public static PromotionModel toModel(Promotion domain) {
        if (domain == null) {
            return null;
        }
        return new PromotionModel(
                domain.getId(),
                domain.getName(),
                domain.getValue(),
                domain.getStartDate(),
                domain.getEndDate(),
                domain.getCategoryId());
    }
}