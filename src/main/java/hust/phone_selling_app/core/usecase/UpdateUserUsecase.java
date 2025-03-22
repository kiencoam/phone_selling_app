package hust.phone_selling_app.core.usecase;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IUserPort;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class UpdateUserUsecase {

    private final IUserPort userPort;
    private final PasswordEncoder passwordEncoder;

    public UserEntity rename(String newFullName, Long userId) {

        UserEntity user = userPort.findById(userId);

        if (user == null) {
            log.error("User with id {} is not existed", userId);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        user.setFullName(newFullName);
        user = userPort.update(user);
        user.setPassword(null);
        return user;

    }

    public UserEntity changePassword(String newPassword, String oldPassword, Long userId) {

        UserEntity user = userPort.findById(userId);

        if (user == null) {
            log.error("User with id {} is not existed", userId);
            throw new AppException(ErrorCode.USER_NOT_FOUND);
        }

        if (!passwordEncoder.matches(oldPassword, user.getPassword())) {
            log.error("Old password is not correct");
            throw new AppException(ErrorCode.INCORRECT_PASSWORD);
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        user = userPort.update(user);
        user.setPassword(null);
        return user;

    }

}
