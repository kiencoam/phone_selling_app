package hust.phone_selling_app.infrastructure.config;

import java.time.Instant;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.domain.reviewpermission.ReviewPermissionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CleanupService {

    private final ReviewPermissionRepository reviewPermissionRepository;

    @Value("${app.service.cleanup.review-permission.expiration}")
    private Long expiration;

    /**
     * Deletes expired review permissions from the database.
     * This method is intended to be called periodically to clean up expired review
     * permissions.
     */
    @Scheduled(initialDelayString = "0", fixedDelayString = "${app.service.cleanup.review-permission.interval}")
    public void cleanupExpiredReviewPermissions() {
        log.info("Deleting expired review permissions...");
        reviewPermissionRepository.deleteExpiredReviewPermissions(Instant.now().minusMillis(expiration));
        log.info("Expired review permissions deleted successfully.");
    }

}
