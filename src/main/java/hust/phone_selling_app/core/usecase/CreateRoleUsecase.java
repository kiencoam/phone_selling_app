package hust.phone_selling_app.core.usecase;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.dto.request.CreateRoleRequestDto;
import hust.phone_selling_app.core.domain.entity.RoleEntity;
import hust.phone_selling_app.core.domain.mapper.RoleMapper;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.core.port.IRolePort;
import hust.phone_selling_app.core.validation.RoleValidation;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class CreateRoleUsecase {

    private final IRolePort rolePort;
    private final RoleValidation roleValidation;

    public RoleEntity createRole(CreateRoleRequestDto request) {
        if (roleValidation.isCodeExisted(request.getCode())) {
            log.error("Role {} is already existed", request.getCode());
            throw new AppException(ErrorCode.ROLE_EXISTED);
        }

        RoleEntity role = RoleMapper.INSTANCE.toEntity(request);
        role = rolePort.save(role);
        return role;
    }

}
