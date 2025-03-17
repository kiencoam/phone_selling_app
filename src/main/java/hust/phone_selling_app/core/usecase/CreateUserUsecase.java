package hust.phone_selling_app.core.usecase;

import org.springframework.data.util.Pair;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.dto.request.CreateCustomerRequestDto;
import hust.phone_selling_app.core.domain.dto.request.CreateUserRequestDto;
import hust.phone_selling_app.core.domain.entity.RoleEntity;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.domain.mapper.UserMapper;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IRolePort;
import hust.phone_selling_app.core.port.IUserPort;
import hust.phone_selling_app.core.validation.RoleValidation;
import hust.phone_selling_app.core.validation.UserValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateUserUsecase {

    private final IUserPort userPort;
    private final IRolePort rolePort;
    private final UserValidation userValidation;
    private final RoleValidation roleValidation;
    private final PasswordEncoder passwordEncoder;

    public UserEntity createUser(CreateUserRequestDto request) {

        if (userValidation.isEmailExisted(request.getEmail())) {
            log.error("Email {} is already existed", request.getEmail());
            throw new AppException(ErrorCode.USER_EMAIL_EXISTED);
        }

        Pair<Boolean, RoleEntity> roleExisted = roleValidation.isRoleExisted(request.getRoleId());
        if (!roleExisted.getFirst()) {
            log.error("Role with id {} is not existed", request.getRoleId());
            throw new AppException(ErrorCode.ROLE_NOT_FOUND);
        }

        UserEntity user = UserMapper.INSTANCE.toEntity(request);
        user.setRole(roleExisted.getSecond());
        user.setIsActive(true);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userPort.save(user);
        user.setPassword(null);
        user.setRole(roleExisted.getSecond());

        return user;
    }

    public UserEntity createCustomer(CreateCustomerRequestDto request) {
        if (userValidation.isEmailExisted(request.getEmail())) {
            log.error("Email {} is already existed", request.getEmail());
            throw new AppException(ErrorCode.USER_EMAIL_EXISTED);
        }

        RoleEntity role = rolePort.getCustomerRole();

        UserEntity user = UserMapper.INSTANCE.toEntity(request);
        user.setRole(role);
        user.setIsActive(true);
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user = userPort.save(user);
        user.setPassword(null);
        user.setRole(role);

        return user;
    }

}
