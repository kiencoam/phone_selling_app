package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.port.IPromotionPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class DeletePromotionUsecase {

    private final IPromotionPort promotionPort;

    public void delete(Long id) {
        log.info("[DeletePromotionUsecase] Delete promotion with id: {}", id);
        promotionPort.delete(id);
    }

    public void unapply(Long promotionId, Long productId) {
        log.info("[DeletePromotionUsecase] Unapply promotion with id: {} to product with id: {}", promotionId,
                productId);
        promotionPort.unapply(promotionId, productId);
    }

}
