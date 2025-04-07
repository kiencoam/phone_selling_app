package hust.phone_selling_app.domain.reviewpermission;

import java.time.Instant;
import java.util.List;

public interface ReviewPermissionRepository {

    public ReviewPermission create(ReviewPermission reviewPermission);

    public void deleteById(Long id);

    public void deleteExpiredReviewPermissions(Instant timestamp);

    public ReviewPermission findById(Long id);

    public List<ReviewPermission> findAllByUserId(Long userId);

}
