package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import hust.phone_selling_app.infrastructure.persistence.model.PromotionModel;

public interface PromotionRepositoryJpa
                extends JpaRepository<PromotionModel, Long>, JpaSpecificationExecutor<PromotionModel> {

        List<PromotionModel> findByCategoryId(Long categoryId);

        @Query("SELECT p FROM PromotionModel p WHERE p.categoryId = :categoryId AND p.startDate <= :date AND p.endDate >= :date")
        List<PromotionModel> findActiveByCategoryIdAndDate(@Param("categoryId") Long categoryId,
                        @Param("date") Instant date);
}
