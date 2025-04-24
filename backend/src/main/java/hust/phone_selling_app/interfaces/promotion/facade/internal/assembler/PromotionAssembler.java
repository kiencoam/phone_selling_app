package hust.phone_selling_app.interfaces.promotion.facade.internal.assembler;

import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.interfaces.promotion.facade.dto.PromotionDTO;

public class PromotionAssembler {

    public static PromotionDTO toDTO(Promotion promotion) {
        return PromotionDTO.builder()
                .id(promotion.getId())
                .name(promotion.getName())
                .value(promotion.getValue())
                .startDate(promotion.getStartDate().toString())
                .endDate(promotion.getEndDate().toString())
                .build();
    }

}
