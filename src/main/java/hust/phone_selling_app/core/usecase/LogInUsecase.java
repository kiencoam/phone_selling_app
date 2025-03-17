package hust.phone_selling_app.core.usecase;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.dto.request.LogInRequestDTO;
import hust.phone_selling_app.core.domain.dto.response.LogInResponseDTO;
import hust.phone_selling_app.core.domain.entity.RoleEntity;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IRolePort;
import hust.phone_selling_app.core.port.IUserPort;
import hust.phone_selling_app.kernel.utils.JwtUtils;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class LogInUsecase {

    private final PasswordEncoder passwordEncoder;
    private final IUserPort userPort;
    private final IRolePort rolePort;
    private final JwtUtils jwtUtils;

    public LogInResponseDTO logIn(LogInRequestDTO request, String roleCode) {
        UserEntity user = userPort.findByEmail(request.getEmail());

        if (user == null) {
            log.info("Email {} is not existed", request.getEmail());
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            log.info("Password is not correct");
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        RoleEntity role = rolePort.findById(user.getRole().getId());
        user.setRole(role);
        if (!role.getCode().equals(roleCode)) {
            log.info("Role is not correct");
            throw new AppException(ErrorCode.UNAUTHORIZED);
        }

        return new LogInResponseDTO(jwtUtils.generateToken(user));
    }

}
