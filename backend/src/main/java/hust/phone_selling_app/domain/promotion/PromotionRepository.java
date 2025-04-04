package hust.phone_selling_app.domain.promotion;

import java.util.List;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.shared.PromotionSearchCriteria;

public interface PromotionRepository {

    public Promotion save(Promotion promotion);

    public void delete(Long id);

    public Promotion findById(Long id);

    public List<Promotion> findInUsePromotionsByCategoryId(Long categoryId);

    public Page<Promotion> search(PromotionSearchCriteria criteria);

}
