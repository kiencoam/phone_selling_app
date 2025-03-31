package hust.phone_selling_app.interfaces.promotion.facade.internal;

import org.springframework.data.domain.Page;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.domain.category.Category;
import hust.phone_selling_app.domain.category.CategoryRepository;
import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.domain.promotion.PromotionRepository;
import hust.phone_selling_app.domain.shared.PromotionSearchCriteria;
import hust.phone_selling_app.interfaces.promotion.facade.PromotionServiceFacade;
import hust.phone_selling_app.interfaces.promotion.facade.dto.PromotionDTO;
import hust.phone_selling_app.interfaces.promotion.facade.internal.assembler.PromotionAssembler;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class PromotionServiceFacadeImpl implements PromotionServiceFacade {

    private final PromotionRepository promotionRepository;
    private final CategoryRepository categoryRepository;

    @Override
    public PromotionDTO create(Promotion promotion) {
        Promotion savedPromotion = promotionRepository.save(promotion);
        return PromotionAssembler.toDTO(savedPromotion);
    }

    @Override
    public PromotionDTO update(Promotion promotion) {
        Promotion existingPromotion = promotionRepository.findById(promotion.getId());
        if (existingPromotion == null) {
            log.error("Promotion with id {} not found", promotion.getId());
            throw new AppException(ErrorCode.PROMOTION_NOT_FOUND);
        }

        Category category = categoryRepository.findById(promotion.getCategoryId());
        if (category == null) {
            log.error("Category with id {} not found", promotion.getCategoryId());
            throw new AppException(ErrorCode.CATEGORY_NOT_FOUND);
        }

        Promotion updatedPromotion = promotionRepository.save(promotion);
        return PromotionAssembler.toDTO(updatedPromotion);
    }

    @Override
    public void delete(Long id) {
        Promotion existingPromotion = promotionRepository.findById(id);
        if (existingPromotion == null) {
            log.error("Promotion with id {} not found", id);
            throw new AppException(ErrorCode.PROMOTION_NOT_FOUND);
        }

        promotionRepository.delete(existingPromotion.getId());
    }

    @Override
    public PromotionDTO getPromotionById(Long id) {
        Promotion existingPromotion = promotionRepository.findById(id);
        if (existingPromotion == null) {
            log.error("Promotion with id {} not found", id);
            throw new AppException(ErrorCode.PROMOTION_NOT_FOUND);
        }

        PromotionDTO promotionDTO = PromotionAssembler.toDTO(existingPromotion);

        Category category = categoryRepository.findById(existingPromotion.getCategoryId());
        promotionDTO.setCategory(category);

        return promotionDTO;
    }

    @Override
    public Page<PromotionDTO> search(PromotionSearchCriteria criteria) {
        Page<Promotion> promotions = promotionRepository.search(criteria);
        return promotions.map(promotion -> {
            PromotionDTO promotionDTO = PromotionAssembler.toDTO(promotion);
            Category category = categoryRepository.findById(promotion.getCategoryId());
            promotionDTO.setCategory(category);
            return promotionDTO;
        });
    }

}
