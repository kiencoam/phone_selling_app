package hust.phone_selling_app.infrastructure.persistence.jpa;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import hust.phone_selling_app.infrastructure.persistence.model.PromotionModel;

public interface PromotionRepositoryJpa
        extends JpaRepository<PromotionModel, Long>, JpaSpecificationExecutor<PromotionModel> {

}
