package hust.phone_selling_app.infrastructure.persistence.assembler;

import hust.phone_selling_app.domain.reviewpermission.ReviewPermission;
import hust.phone_selling_app.infrastructure.persistence.model.ReviewPermissionModel;

public class ReviewPermissionAssembler {

    public static ReviewPermission toDomain(ReviewPermissionModel model) {
        if (model == null) {
            return null;
        }
        return ReviewPermission.builder()
                .id(model.getId())
                .userId(model.getUserId())
                .productId(model.getProductId())
                .build();
    }

    public static ReviewPermissionModel toModel(ReviewPermission domain) {
        if (domain == null) {
            return null;
        }
        return ReviewPermissionModel.builder()
                .id(domain.getId())
                .userId(domain.getUserId())
                .productId(domain.getProductId())
                .build();
    }

}
