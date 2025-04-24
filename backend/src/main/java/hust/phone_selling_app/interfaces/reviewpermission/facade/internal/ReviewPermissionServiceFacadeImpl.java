package hust.phone_selling_app.interfaces.reviewpermission.facade.internal;

import java.util.List;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.domain.reviewpermission.ReviewPermission;
import hust.phone_selling_app.domain.reviewpermission.ReviewPermissionRepository;
import hust.phone_selling_app.interfaces.product.facade.ProductServiceFacade;
import hust.phone_selling_app.interfaces.reviewpermission.facade.ReviewPermissionServiceFacade;
import hust.phone_selling_app.interfaces.reviewpermission.facade.dto.ReviewPermissionDTO;
import hust.phone_selling_app.interfaces.reviewpermission.facade.internal.assembler.ReviewPermissionAssembler;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ReviewPermissionServiceFacadeImpl implements ReviewPermissionServiceFacade {

    private final ReviewPermissionRepository reviewPermissionRepository;
    private final ProductServiceFacade productServiceFacade;

    @Override
    public List<ReviewPermissionDTO> getAllByUserId(Long userId) {
        List<ReviewPermission> reviewPermissions = reviewPermissionRepository.findAllByUserId(userId);
        return reviewPermissions.stream().map(reviewPermission -> {
            ReviewPermissionDTO dto = ReviewPermissionAssembler.toDTO(reviewPermission);
            dto.setProduct(productServiceFacade.findCatalogItemById(reviewPermission.getProductId()));
            return dto;
        }).toList();
    }

}
