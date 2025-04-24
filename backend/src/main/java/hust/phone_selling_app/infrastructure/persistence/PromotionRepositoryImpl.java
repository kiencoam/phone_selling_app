package hust.phone_selling_app.infrastructure.persistence;

import java.time.Instant;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Component;

import hust.phone_selling_app.domain.promotion.Promotion;
import hust.phone_selling_app.domain.promotion.PromotionRepository;
import hust.phone_selling_app.domain.shared.PromotionSearchCriteria;
import hust.phone_selling_app.infrastructure.persistence.assembler.PromotionAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.PromotionRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.PromotionModel;
import hust.phone_selling_app.infrastructure.persistence.specification.PromotionSpecification;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class PromotionRepositoryImpl implements PromotionRepository {

    private final PromotionRepositoryJpa promotionRepository;

    @Override
    public Promotion save(Promotion promotion) {
        PromotionModel model = PromotionAssembler.toModel(promotion);
        return PromotionAssembler.toDomain(promotionRepository.save(model));
    }

    @Override
    public void delete(Long id) {
        promotionRepository.deleteById(id);
    }

    @Override
    public Promotion findById(Long id) {
        PromotionModel model = promotionRepository.findById(id).orElse(null);
        return PromotionAssembler.toDomain(model);
    }

    @Override
    public Page<Promotion> search(PromotionSearchCriteria criteria) {
        Pageable pageable = criteria.toPageable();
        var page = promotionRepository.findAll(PromotionSpecification.satisfySearchCriteria(criteria), pageable);
        return page.map(PromotionAssembler::toDomain);
    }

    @Override
    public List<Promotion> findInUsePromotionsByCategoryId(Long categoryId) {
        List<PromotionModel> models = promotionRepository.findActiveByCategoryIdAndDate(categoryId, Instant.now());
        return models.stream()
                .map(PromotionAssembler::toDomain)
                .toList();
    }

}
