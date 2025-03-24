package hust.phone_selling_app.ui.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.core.domain.dto.request.CreateUserRequestDto;
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

    @PostMapping("/create-user")
    public ResponseEntity<Resource<UserEntity>> register(@Valid @RequestBody CreateUserRequestDto request) {
        log.info("Register new user with email {}", request.getEmail());
        UserEntity user = userService.createUser(request);
        return ResponseEntity.ok(new Resource<>(user));
    }

}
