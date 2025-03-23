package hust.phone_selling_app.core.port;

import java.util.List;

import hust.phone_selling_app.core.domain.entity.PromotionEntity;

public interface IPromotionPort {

    public PromotionEntity save(PromotionEntity promotionEntity);

    public PromotionEntity update(PromotionEntity promotionEntity);

    public void delete(Long id);

    public PromotionEntity findById(Long id);

    public List<PromotionEntity> findByProductId(Long productId);

    public PromotionEntity apply(Long promotionId, Long productId);

    public PromotionEntity unapply(Long promotionId, Long productId);

}
