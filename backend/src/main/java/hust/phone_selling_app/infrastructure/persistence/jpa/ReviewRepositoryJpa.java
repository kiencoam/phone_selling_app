package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import hust.phone_selling_app.infrastructure.persistence.model.ReviewModel;

public interface ReviewRepositoryJpa extends JpaRepository<ReviewModel, Long>, JpaSpecificationExecutor<ReviewModel> {

    List<ReviewModel> findByProductId(Long productId);

    void deleteByProductId(Long productId);

}
