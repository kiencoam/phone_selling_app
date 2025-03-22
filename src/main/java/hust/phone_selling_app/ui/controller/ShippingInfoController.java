package hust.phone_selling_app.ui.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.dto.request.CreateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.dto.request.UpdateShippingInfoRequestDto;
import hust.phone_selling_app.core.domain.entity.ShippingInfoEntity;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.service.IShippingInfoService;
import hust.phone_selling_app.kernel.utils.JwtUtils;
import hust.phone_selling_app.ui.resource.Resource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("api/v1/shipping-infos")
@Slf4j
@RequiredArgsConstructor
@Validated
public class ShippingInfoController {

    private final IShippingInfoService shippingInfoService;
    private final JwtUtils jwtUtils;

    @PostMapping("/create")
    public ResponseEntity<Resource<ShippingInfoEntity>> createShippingInfo(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody CreateShippingInfoRequestDto request) {
        if (token == null) {
            log.info("Token is null");
            throw new AppException(ErrorCode.TOKEN_NOT_FOUND);
        }

        token = token.replace("Bearer ", "");
        Long customerId = jwtUtils.extractUserId(token);

        log.info("Create shipping info for customer {}", customerId);
        request.setCustomerId(customerId);
        ShippingInfoEntity shippingInfo = shippingInfoService.save(request);
        return ResponseEntity.ok(new Resource<>(shippingInfo));
    }

    @PutMapping("/update")
    public ResponseEntity<Resource<ShippingInfoEntity>> updateShippingInfo(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody UpdateShippingInfoRequestDto request) {
        if (token == null) {
            log.info("Token is null");
            throw new AppException(ErrorCode.TOKEN_NOT_FOUND);
        }

        token = token.replace("Bearer ", "");
        Long customerId = jwtUtils.extractUserId(token);

        log.info("Update shipping info for customer {}", customerId);
        request.setCustomerId(customerId);
        ShippingInfoEntity shippingInfo = shippingInfoService.update(request);
        return ResponseEntity.ok(new Resource<>(shippingInfo));
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<Resource<?>> deleteShippingInfo(
            @RequestHeader("Authorization") String token,
            @PathVariable Long id) {
        if (token == null) {
            log.info("Token is null");
            throw new AppException(ErrorCode.TOKEN_NOT_FOUND);
        }

        token = token.replace("Bearer ", "");
        Long customerId = jwtUtils.extractUserId(token);

        log.info("Delete shipping info {} for customer {}", id, customerId);
        shippingInfoService.delete(id, customerId);
        return ResponseEntity.ok(new Resource<>(null));
    }

    @GetMapping("")
    public ResponseEntity<Resource<List<ShippingInfoEntity>>> getShippingInfo(
            @RequestHeader("Authorization") String token) {
        if (token == null) {
            log.info("Token is null");
            throw new AppException(ErrorCode.TOKEN_NOT_FOUND);
        }

        token = token.replace("Bearer ", "");
        Long customerId = jwtUtils.extractUserId(token);

        log.info("Get shipping info for customer {}", customerId);
        List<ShippingInfoEntity> shippingInfos = shippingInfoService.findByCustomerId(customerId);
        return ResponseEntity.ok(new Resource<>(shippingInfos));
    }

}
