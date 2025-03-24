package hust.phone_selling_app.ui.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.constant.Role;
import hust.phone_selling_app.core.domain.dto.request.ChangeUserPasswordRequestDto;
import hust.phone_selling_app.core.domain.dto.request.CreateCustomerRequestDto;
import hust.phone_selling_app.core.domain.dto.request.LogInRequestDTO;
import hust.phone_selling_app.core.domain.dto.request.RenameUserRequestDto;
import hust.phone_selling_app.core.domain.dto.response.LogInResponseDTO;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.service.IUserService;
import hust.phone_selling_app.kernel.utils.JwtUtils;
import hust.phone_selling_app.ui.resource.Resource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/personal")
@RequiredArgsConstructor
@Slf4j
@Validated
public class PersonalController {

    private final IUserService userService;
    private final JwtUtils jwtUtils;

    @PostMapping("/register-customer")
    public ResponseEntity<Resource<UserEntity>> registerCustomer(@Valid @RequestBody CreateCustomerRequestDto request) {
        log.info("Register new customer with email {}", request.getEmail());
        UserEntity user = userService.createCustomer(request);
        return ResponseEntity.ok(new Resource<>(user));
    }

    @PostMapping("/login-customer")
    public ResponseEntity<Resource<LogInResponseDTO>> customerLogIn(@Valid @RequestBody LogInRequestDTO request) {
        log.info("Log in with email {}", request.getEmail());
        var response = userService.logIn(request, Role.CUSTOMER.code());
        return ResponseEntity.ok(new Resource<>(response));
    }

    @PostMapping("/login-admin")
    public ResponseEntity<Resource<LogInResponseDTO>> adminLogIn(@Valid @RequestBody LogInRequestDTO request) {
        log.info("Log in with email {}", request.getEmail());
        var response = userService.logIn(request, Role.ADMIN.code());
        return ResponseEntity.ok(new Resource<>(response));
    }

    @PostMapping("/login-staff")
    public ResponseEntity<Resource<LogInResponseDTO>> staffLogIn(@Valid @RequestBody LogInRequestDTO request) {
        log.info("Log in with email {}", request.getEmail());
        var response = userService.logIn(request, Role.STAFF.code());
        return ResponseEntity.ok(new Resource<>(response));
    }

    @PutMapping("/rename")
    public ResponseEntity<Resource<UserEntity>> rename(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody RenameUserRequestDto request) {
        if (token == null) {
            throw new AppException(ErrorCode.INVALID_TOKEN);
        }

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Rename user {} with new full name {}", userId, request.getFullName());
        UserEntity user = userService.rename(request.getFullName(), userId);
        return ResponseEntity.ok(new Resource<>(user));
    }

    @PutMapping("/change-password")
    public ResponseEntity<Resource<UserEntity>> changePassword(
            @RequestHeader("Authorization") String token,
            @Valid @RequestBody ChangeUserPasswordRequestDto request) {
        if (token == null) {
            throw new AppException(ErrorCode.TOKEN_NOT_FOUND);
        }

        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Change password user {}", userId);
        UserEntity user = userService.changePassword(request.getNewPassword(), request.getOldPassword(), userId);
        return ResponseEntity.ok(new Resource<>(user));
    }

}
