package hust.phone_selling_app.domain.promotion;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.shared.PromotionSearchCriteria;

public interface PromotionRepository {

    public Promotion save(Promotion promotion);

    public void delete(Long id);

    public Promotion findById(Long id);

    public Page<Promotion> search(PromotionSearchCriteria criteria);

}
