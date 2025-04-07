package hust.phone_selling_app.interfaces.reviewpermission.facade;

import java.util.List;

import hust.phone_selling_app.interfaces.reviewpermission.facade.dto.ReviewPermissionDTO;

public interface ReviewPermissionServiceFacade {

    List<ReviewPermissionDTO> getAllByUserId(Long userId);

}
