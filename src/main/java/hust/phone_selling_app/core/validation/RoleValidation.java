package hust.phone_selling_app.core.validation;

import org.springframework.data.util.Pair;
import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.RoleEntity;
import hust.phone_selling_app.core.port.IRolePort;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleValidation {

    private final IRolePort rolePort;

    public boolean isCodeExisted(String code) {
        return rolePort.findByCode(code) != null;
    }

    public Pair<Boolean, RoleEntity> isRoleExisted(Long id) {
        RoleEntity roleEntity = rolePort.findById(id);
        return Pair.of(roleEntity != null, roleEntity);
    }

}
