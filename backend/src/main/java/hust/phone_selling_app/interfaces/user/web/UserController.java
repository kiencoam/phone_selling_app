package hust.phone_selling_app.interfaces.user.web;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.user.ShippingInfo;
import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.domain.user.UserRepository;
import hust.phone_selling_app.infrastructure.utils.JwtUtils;
import hust.phone_selling_app.interfaces.resource.Resource;
import hust.phone_selling_app.interfaces.user.facade.UserServiceFacade;
import hust.phone_selling_app.interfaces.user.facade.dto.UserDTO;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/user")
@RequiredArgsConstructor
@Slf4j
@Validated
public class UserController {

    private final UserServiceFacade userServiceFacade;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @PostMapping("admin")
    public ResponseEntity<Resource<UserDTO>> createUser(@Valid @RequestBody UserCreationForm form) {
        log.info("Creating user: {}", form.getEmail());

        User user = User.builder()
                .email(form.getEmail())
                .password(passwordEncoder.encode(form.getPassword()))
                .fullName(form.getFullName())
                .roleId(form.getRoleId())
                .isActive(true)
                .build();

        UserDTO createdUser = userServiceFacade.save(user);

        return ResponseEntity.ok(new Resource<>(createdUser));
    }

    @PutMapping("admin")
    public ResponseEntity<Resource<UserDTO>> updateUser(@Valid @RequestBody UserUpdateForm form) {
        log.info("Updating user: {}", form.getId());

        User user = userRepository.findById(form.getId());

        if (user == null) {
            log.error("User not found with id: {}", form.getId());
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        user.setFullName(form.getFullName());
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        UserDTO updatedUser = userServiceFacade.save(user);

        return ResponseEntity.ok(new Resource<>(updatedUser));
    }

    @PutMapping("personal/change-password")
    public ResponseEntity<Resource<UserDTO>> updatePassword(
            @Valid @RequestBody PasswordChangeForm form,
            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Change password for user {}", userId);

        User user = userRepository.findById(userId);

        if (!passwordEncoder.matches(form.getOldPassword(), user.getPassword())) {
            log.info("Incorrect password for user {}", userId);
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(form.getNewPassword()));
        UserDTO updatedUser = userServiceFacade.save(user);

        return ResponseEntity.ok(new Resource<>(updatedUser));
    }

    @PutMapping("admin/change-status")
    public ResponseEntity<Resource<UserDTO>> updateStatus(
            @Valid @RequestBody StatusChangeForm form) {
        log.info("Change status for user {}", form.getId());
        User user = userRepository.findById(form.getId());

        if (user == null) {
            log.error("User not found with id: {}", form.getId());
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        user.setIsActive(form.getIsActive());
        UserDTO updatedUser = userServiceFacade.save(user);

        return ResponseEntity.ok(new Resource<>(updatedUser));
    }

    @PutMapping("personal/rename")
    public ResponseEntity<Resource<UserDTO>> renameUser(
            @Valid @RequestBody RenameForm form,
            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Rename user {}", userId);

        User user = userRepository.findById(userId);

        if (user == null) {
            log.error("User not found with id: {}", userId);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        user.setFullName(form.getFullName());
        UserDTO updatedUser = userServiceFacade.save(user);

        return ResponseEntity.ok(new Resource<>(updatedUser));
    }

    @PostMapping("shipping-info")
    public ResponseEntity<Resource<ShippingInfo>> createShippingInfo(
            @Valid @RequestBody ShippingInfoAddForm form,
            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Creating shipping info for user {}", userId);

        ShippingInfo shippingInfo = ShippingInfo.builder()
                .phone(form.getPhone())
                .address(form.getAddress())
                .receiveName(form.getReceiveName())
                .build();

        shippingInfo = userServiceFacade.addShippingInfo(userId, shippingInfo);

        return ResponseEntity.ok(new Resource<>(shippingInfo));
    }

    @PutMapping("shipping-info")
    public ResponseEntity<Resource<ShippingInfo>> updateShippingInfo(
            @Valid @RequestBody ShippingInfoUpdateForm form,
            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Updating shipping info for user {}", userId);

        ShippingInfo shippingInfo = ShippingInfo.builder()
                .id(form.getId())
                .phone(form.getPhone())
                .address(form.getAddress())
                .receiveName(form.getReceiveName())
                .build();

        shippingInfo = userServiceFacade.updateShippingInfo(userId, shippingInfo);

        return ResponseEntity.ok(new Resource<>(shippingInfo));

    }

    @DeleteMapping("shipping-info/{shippingInfoId}")
    public ResponseEntity<Resource<?>> deleteShippingInfo(
            @PathVariable Long shippingInfoId,
            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Deleting shipping info for user {}", userId);

        userServiceFacade.removeShippingInfo(userId, shippingInfoId);

        return ResponseEntity.ok(new Resource<>(null));
    }

    @GetMapping("shipping-info")
    public ResponseEntity<Resource<List<ShippingInfo>>> getShippingInfo(
            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Getting shipping info for user {}", userId);

        UserDTO userDTO = userServiceFacade.getUserById(userId);

        List<ShippingInfo> shippingInfos = userDTO.getShippingInfos();

        return ResponseEntity.ok(new Resource<>(shippingInfos));

    }

    @GetMapping("admin/{id}")
    public ResponseEntity<Resource<UserDTO>> getUserById(@PathVariable Long id) {
        log.info("Getting user by id {}", id);

        UserDTO userDTO = userServiceFacade.getUserById(id);

        return ResponseEntity.ok(new Resource<>(userDTO));
    }

    @DeleteMapping("admin/{id}")
    public ResponseEntity<Resource<?>> deleteUser(@PathVariable Long id) {
        log.info("Deleting user {}", id);

        userServiceFacade.deleteById(id);

        return ResponseEntity.ok(new Resource<>(null));
    }

    @GetMapping("personal")
    public ResponseEntity<Resource<UserDTO>> getPersonalInfo(
            @RequestHeader("Authorization") String token) {
        token = token.replace("Bearer ", "");
        Long userId = jwtUtils.extractUserId(token);

        log.info("Getting personal info for user {}", userId);

        UserDTO userDTO = userServiceFacade.getUserById(userId);

        return ResponseEntity.ok(new Resource<>(userDTO));
    }

    @GetMapping("admin/search")
    public ResponseEntity<Resource<Page<UserDTO>>> searchUser(
            @RequestParam(required = true) Long roleId,
            @RequestParam(required = false, defaultValue = "") String keyword,
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int size) {

        Page<UserDTO> userPage = userServiceFacade.search(roleId, keyword, page, size);

        return ResponseEntity.ok(new Resource<>(userPage));
    }

}
