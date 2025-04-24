package hust.phone_selling_app.interfaces.reviewpermission.facade.internal.assembler;

import hust.phone_selling_app.domain.reviewpermission.ReviewPermission;
import hust.phone_selling_app.interfaces.reviewpermission.facade.dto.ReviewPermissionDTO;

public class ReviewPermissionAssembler {

    public static ReviewPermissionDTO toDTO(ReviewPermission reviewPermission) {
        return ReviewPermissionDTO.builder()
                .id(reviewPermission.getId())
                .userId(reviewPermission.getUserId())
                .build();
    }

}
