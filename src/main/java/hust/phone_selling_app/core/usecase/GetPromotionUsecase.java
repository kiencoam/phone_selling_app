package hust.phone_selling_app.core.usecase;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.PromotionEntity;
import hust.phone_selling_app.core.port.IPromotionPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class GetPromotionUsecase {

    private final IPromotionPort promotionPort;

    public PromotionEntity findById(Long id) {
        log.info("[GetPromotionUsecase] Find promotion with id: {}", id);
        return promotionPort.findById(id);
    }

    public List<PromotionEntity> findByProductId(Long productId) {
        log.info("[GetPromotionUsecase] Find promotions by product id: {}", productId);
        return promotionPort.findByProductId(productId);
    }

}
