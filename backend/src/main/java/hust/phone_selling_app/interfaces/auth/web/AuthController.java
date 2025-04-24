package hust.phone_selling_app.interfaces.auth.web;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import hust.phone_selling_app.interfaces.auth.facade.AuthServiceFacade;
import hust.phone_selling_app.interfaces.resource.Resource;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
@Slf4j
@Validated
@Tag(name = "API Xác thực tài khoản")
public class AuthController {

    private final AuthServiceFacade authServiceFacade;

    @Operation(summary = "Đăng ký tài khoản khách hàng")
    @PostMapping("/customer-register")
    public ResponseEntity<Resource<ResponseData>> registerCustomer(
            @Valid @RequestBody CustomerRegistrationForm form) {
        log.info("Registering customer with email: {}", form.getEmail());

        String token = authServiceFacade.registerCustomer(form.getEmail(), form.getPassword(), form.getFullName());
        ResponseData data = ResponseData.builder().token(token).build();
        return ResponseEntity.ok(new Resource<>(data));
    }

    @Operation(summary = "Đăng nhập tài khoản khách hàng")
    @PostMapping("/customer-login")
    public ResponseEntity<Resource<ResponseData>> loginCustomer(
            @Valid @RequestBody CustomerLoginForm form) {
        log.info("Logging in customer with email: {}", form.getEmail());

        String token = authServiceFacade.loginCustomer(form.getEmail(), form.getPassword());
        ResponseData data = ResponseData.builder().token(token).build();
        return ResponseEntity.ok(new Resource<>(data));
    }

    @Operation(summary = "Đăng nhập tài khoản nhân viên")
    @PostMapping("/staff-login")
    public ResponseEntity<Resource<ResponseData>> loginStaff(
            @Valid @RequestBody StaffLoginForm form) {
        log.info("Logging in staff with email: {}", form.getEmail());

        String token = authServiceFacade.loginStaff(form.getEmail(), form.getPassword());
        ResponseData data = ResponseData.builder().token(token).build();
        return ResponseEntity.ok(new Resource<>(data));
    }

    @Operation(summary = "Đăng nhập tài khoản quản trị viên")
    @PostMapping("/admin-login")
    public ResponseEntity<Resource<ResponseData>> loginAdmin(
            @Valid @RequestBody AdminLoginForm form) {
        log.info("Logging in admin with email: {}", form.getEmail());

        String token = authServiceFacade.loginAdmin(form.getEmail(), form.getPassword());
        ResponseData data = ResponseData.builder().token(token).build();
        return ResponseEntity.ok(new Resource<>(data));
    }

}
