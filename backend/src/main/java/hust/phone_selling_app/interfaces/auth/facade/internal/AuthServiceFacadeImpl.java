package hust.phone_selling_app.interfaces.auth.facade.internal;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.role.Role;
import hust.phone_selling_app.domain.role.RoleCode;
import hust.phone_selling_app.domain.role.RoleRepository;
import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.domain.user.UserRepository;
import hust.phone_selling_app.infrastructure.utils.JwtUtils;
import hust.phone_selling_app.interfaces.auth.facade.AuthServiceFacade;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class AuthServiceFacadeImpl implements AuthServiceFacade {

    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtils jwtUtils;

    @Override
    public String registerCustomer(String email, String password, String fullName) {

        Role role = roleRepository.findByCode(RoleCode.CUSTOMER.code());

        User user = User.builder()
                .email(email)
                .password(passwordEncoder.encode(password))
                .fullName(fullName)
                .roleId(role.getId())
                .isActive(true)
                .build();
        user = userRepository.save(user);

        return jwtUtils.generateToken(user);
    }

    @Override
    public String loginCustomer(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            log.error("User not found with email: {}", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        if (!user.getIsActive()) {
            log.error("User is not active: {}", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        Role role = roleRepository.findByCode(RoleCode.CUSTOMER.code());

        if (!user.getRoleId().equals(role.getId())) {
            log.error("User {} is not a customer", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.error("Incorrect password for user: {}", email);
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }

        return jwtUtils.generateToken(user);
    }

    @Override
    public String loginStaff(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            log.error("User not found with email: {}", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        if (!user.getIsActive()) {
            log.error("User is not active: {}", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        Role role = roleRepository.findByCode(RoleCode.STAFF.code());

        if (!user.getRoleId().equals(role.getId())) {
            log.error("User {} is not a staff", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.error("Incorrect password for user: {}", email);
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }

        return jwtUtils.generateToken(user);
    }

    @Override
    public String loginAdmin(String email, String password) {
        User user = userRepository.findByEmail(email);

        if (user == null) {
            log.error("User not found with email: {}", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        if (!user.getIsActive()) {
            log.error("User is not active: {}", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        Role role = roleRepository.findByCode(RoleCode.ADMIN.code());

        if (!user.getRoleId().equals(role.getId())) {
            log.error("User {} is not an admin", email);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.error("Incorrect password for user: {}", email);
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }

        return jwtUtils.generateToken(user);
    }

}
