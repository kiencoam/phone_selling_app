package hust.phone_selling_app.interfaces.promotion.facade;

import org.springframework.data.domain.Page;

import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.domain.shared.PromotionSearchCriteria;
import hust.phone_selling_app.interfaces.promotion.facade.dto.PromotionDTO;

public interface PromotionServiceFacade {

    public PromotionDTO create(Promotion promotion);

    public PromotionDTO update(Promotion promotion);

    public void delete(Long id);

    public PromotionDTO getPromotionById(Long id);

    public Page<PromotionDTO> search(PromotionSearchCriteria criteria);

}
