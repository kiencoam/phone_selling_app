package hust.phone_selling_app.infrastructure.config;

import java.util.Arrays;

import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import hust.phone_selling_app.domain.role.Role;
import hust.phone_selling_app.domain.role.RoleCode;
import hust.phone_selling_app.domain.role.RoleRepository;
import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.domain.user.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Configuration
@RequiredArgsConstructor
@Slf4j
public class DataInitializer {

    private final Role[] RoleCodes = {
            Role.builder().name(RoleCode.ADMIN.name_value()).code(RoleCode.ADMIN.code()).build(),
            Role.builder().name(RoleCode.STAFF.name_value()).code(RoleCode.STAFF.code()).build(),
            Role.builder().name(RoleCode.CUSTOMER.name_value()).code(RoleCode.CUSTOMER.code()).build()
    };

    private final User admin = User.builder()
            .email("admin@email.com")
            .fullName("admin")
            .password("password")
            .isActive(true)
            .build();

    private final RoleRepository roleRepository;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Bean
    ApplicationRunner init() {
        return args -> {

            // Tạo RoleCodes
            Arrays.stream(RoleCodes).forEach(RoleCode -> {
                if (roleRepository.findByCode(RoleCode.getCode()) == null) {
                    roleRepository.save(RoleCode);
                    log.info("RoleCode {} is created", RoleCode.getName());
                } else {
                    log.info("RoleCode {} is already existed", RoleCode.getName());
                }
            });

            // Tạo tài khoản admin
            if (userRepository.findByEmail(admin.getEmail()) == null) {
                admin.setRoleId(roleRepository.findByCode(RoleCode.ADMIN.code()).getId());
                admin.setPassword(passwordEncoder.encode(admin.getPassword()));
                userRepository.save(admin);
                log.info("Default admin account is created");
            } else {
                log.info("Default admin account is already existed");
            }

        };
    }

}
