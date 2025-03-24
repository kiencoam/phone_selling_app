package hust.phone_selling_app.core.usecase;

import java.time.Instant;
import java.time.temporal.ChronoUnit;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.dto.request.CreatePromotionRequestDto;
import hust.phone_selling_app.core.domain.entity.PromotionEntity;
import hust.phone_selling_app.core.domain.mapper.PromotionMapper;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IPromotionPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreatePromotionUsecase {

    private final IPromotionPort promotionPort;

    public PromotionEntity create(CreatePromotionRequestDto request) {
        log.info("[CreatePromotionUsecase] Create new promotion with name: {}", request.getName());

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
        return promotionPort.save(promotion);
    }

    public PromotionEntity apply(Long promotionId, Long productId) {
        log.info("[CreatePromotionUsecase] Apply promotion with id: {} to product with id: {}", promotionId, productId);

        return promotionPort.apply(promotionId, productId);
    }

}
