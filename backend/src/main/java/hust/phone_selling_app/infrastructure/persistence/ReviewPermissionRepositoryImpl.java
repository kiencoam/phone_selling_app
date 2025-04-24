package hust.phone_selling_app.infrastructure.persistence;

import java.time.Instant;
import java.util.List;

import org.springframework.stereotype.Component;

import hust.phone_selling_app.domain.reviewpermission.ReviewPermission;
import hust.phone_selling_app.domain.reviewpermission.ReviewPermissionRepository;
import hust.phone_selling_app.infrastructure.persistence.assembler.ReviewPermissionAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.ReviewPermissionRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.ReviewPermissionModel;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class ReviewPermissionRepositoryImpl implements ReviewPermissionRepository {

    private final ReviewPermissionRepositoryJpa reviewPermissionRepository;

    @Override
    public ReviewPermission create(ReviewPermission reviewPermission) {
        ReviewPermissionModel reviewPermissionModel = ReviewPermissionAssembler.toModel(reviewPermission);
        return ReviewPermissionAssembler.toDomain(
                reviewPermissionRepository.save(reviewPermissionModel));
    }

    @Override
    public void deleteById(Long id) {
        reviewPermissionRepository.deleteById(id);
    }

    @Override
    public void deleteExpiredReviewPermissions(Instant timestamp) {
        List<ReviewPermissionModel> expiredPermissions = reviewPermissionRepository
                .findByCreatedAtBefore(timestamp);
        if (expiredPermissions != null && !expiredPermissions.isEmpty()) {
            reviewPermissionRepository.deleteAll(expiredPermissions);
        }
    }

    @Override
    public ReviewPermission findById(Long id) {
        ReviewPermissionModel reviewPermissionModel = reviewPermissionRepository.findById(id).orElse(null);
        return ReviewPermissionAssembler.toDomain(reviewPermissionModel);
    }

    @Override
    public List<ReviewPermission> findAllByUserId(Long userId) {
        List<ReviewPermissionModel> reviewPermissionModels = reviewPermissionRepository.findByUserId(userId);
        return reviewPermissionModels.stream()
                .map(ReviewPermissionAssembler::toDomain)
                .toList();
    }

    @Override
    public void deleteByProductId(Long productId) {
        reviewPermissionRepository.deleteByProductId(productId);
    }

}
