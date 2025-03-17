package hust.phone_selling_app.ui.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.core.domain.constant.Role;
import hust.phone_selling_app.core.domain.dto.request.CreateCustomerRequestDto;
import hust.phone_selling_app.core.domain.dto.request.CreateUserRequestDto;
import hust.phone_selling_app.core.domain.dto.request.LogInRequestDTO;
import hust.phone_selling_app.core.domain.dto.response.LogInResponseDTO;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.service.IUserService;
import hust.phone_selling_app.ui.resource.Resource;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@Validated
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/v1/users")
public class UserController {

    private final IUserService userService;

    @PostMapping("/register")
    public ResponseEntity<Resource<UserEntity>> register(@Valid @RequestBody CreateUserRequestDto request) {
        log.info("Register new user with email {}", request.getEmail());
        UserEntity user = userService.createUser(request);
        return ResponseEntity.ok(new Resource<>(user));
    }

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

}
