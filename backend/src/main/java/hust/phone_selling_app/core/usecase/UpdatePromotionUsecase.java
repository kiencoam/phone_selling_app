package hust.phone_selling_app.core.usecase;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.dto.request.UpdatePromotionRequestDto;
import hust.phone_selling_app.core.domain.entity.PromotionEntity;
import hust.phone_selling_app.core.domain.mapper.PromotionMapper;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IPromotionPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdatePromotionUsecase {

    private final IPromotionPort promotionPort;

    public PromotionEntity update(UpdatePromotionRequestDto request) {
        log.info("[UpdatePromotionUsecase] Update promotion with id: {}", request.getId());

        if (request.getStartDate() == null) {
            request.setStartDate(Instant.now());
        }

        if (request.getEndDate() == null) {
            request.setEndDate(Instant.now().plus(1000, ChronoUnit.YEARS));
        }

        if (request.getStartDate().isAfter(request.getEndDate())) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        PromotionEntity promotion = PromotionMapper.INSTANCE.toEntity(request);
        return promotionPort.update(promotion);
    }

}
