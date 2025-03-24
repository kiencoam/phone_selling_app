package hust.phone_selling_app.kernel.config;

import java.util.Arrays;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import hust.phone_selling_app.core.domain.constant.Role;
import hust.phone_selling_app.core.domain.entity.RoleEntity;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.port.IRolePort;
import hust.phone_selling_app.core.port.IUserPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final RoleEntity[] roles = {
            RoleEntity.builder().name(Role.ADMIN.name_value()).code(Role.ADMIN.code()).build(),
            RoleEntity.builder().name(Role.STAFF.name_value()).code(Role.STAFF.code()).build(),
            RoleEntity.builder().name(Role.CUSTOMER.name_value()).code(Role.CUSTOMER.code()).build()
    };

    private final UserEntity admin = UserEntity.builder()
            .email("admin@email.com")
            .fullName("admin")
            .password("password")
            .isActive(true)
            .build();

    private final IRolePort rolePort;
    private final IUserPort userPort;
    private final PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner init() {
        return args -> {

            // Tạo roles
            Arrays.stream(roles).forEach(role -> {
                if (rolePort.findByCode(role.getCode()) == null) {
                    rolePort.save(role);
                    log.info("Role {} is created", role.getName());
                } else {
                    log.info("Role {} is already existed", role.getName());
                }
            });

            // Tạo tài khoản admin
            if (userPort.findByEmail(admin.getEmail()) == null) {
                admin.setRole(rolePort.findByCode(Role.ADMIN.code()));
                admin.setPassword(passwordEncoder.encode(admin.getPassword()));
                userPort.save(admin);
                log.info("Default admin account is created");
            } else {
                log.info("Default admin account is already existed");
            }

        };
    }

}
