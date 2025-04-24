package hust.phone_selling_app.interfaces.reviewpermission.web;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.infrastructure.utils.JwtUtils;
import hust.phone_selling_app.interfaces.resource.Resource;
import hust.phone_selling_app.interfaces.reviewpermission.facade.ReviewPermissionServiceFacade;
import hust.phone_selling_app.interfaces.reviewpermission.facade.dto.ReviewPermissionDTO;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/review-permission")
@RequiredArgsConstructor
@Slf4j
@Tag(name = "API Quản lý sản phẩm cần được đánh giá", description = "Phân quyền: CUSTOMER")
public class ReviewPermissionController {

    private final ReviewPermissionServiceFacade reviewPermissionServiceFacade;
    private final JwtUtils jwtUtils;

    @Operation(summary = "Lấy danh sách sản phẩm cần được đánh giá")
    @GetMapping()
    public ResponseEntity<Resource<List<ReviewPermissionDTO>>> getAllByUserId(
            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Get all review permissions for user with id: {}", userId);
        List<ReviewPermissionDTO> reviewPermissions = reviewPermissionServiceFacade.getAllByUserId(userId);
        return ResponseEntity.ok(new Resource<>(reviewPermissions));
    }

}
