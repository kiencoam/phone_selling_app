package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.ReviewPermissionModel;

public interface ReviewPermissionRepositoryJpa extends JpaRepository<ReviewPermissionModel, Long> {

    List<ReviewPermissionModel> findByUserId(Long userId);

    List<ReviewPermissionModel> findByCreatedAtBefore(Instant timestamp);

    void deleteByProductId(Long productId);

}
