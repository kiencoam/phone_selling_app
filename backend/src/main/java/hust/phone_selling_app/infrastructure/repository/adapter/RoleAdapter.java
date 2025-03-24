package hust.phone_selling_app.infrastructure.repository.adapter;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.RoleEntity;
import hust.phone_selling_app.core.port.IRolePort;
import hust.phone_selling_app.infrastructure.repository.IRoleRepository;
import hust.phone_selling_app.infrastructure.repository.mapper.RoleMapper;
import hust.phone_selling_app.infrastructure.repository.model.RoleModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class RoleAdapter implements IRolePort {

    private final IRoleRepository roleRepository;

    @Override
    public RoleEntity save(RoleEntity roleEntity) {
        RoleModel model = RoleMapper.INSTANCE.toModel(roleEntity);
        model = roleRepository.save(model);
        return RoleMapper.INSTANCE.toEntity(model);
    }

    @Override
    public RoleEntity findById(Long id) {
        RoleModel model = roleRepository.findById(id).orElse(null);
        return RoleMapper.INSTANCE.toEntity(model);
    }

    @Override
    public RoleEntity findByName(String name) {
        RoleModel model = roleRepository.findByName(name).orElse(null);
        return RoleMapper.INSTANCE.toEntity(model);
    }

    @Override
    public RoleEntity findByCode(String code) {
        RoleModel model = roleRepository.findByCode(code).orElse(null);
        return RoleMapper.INSTANCE.toEntity(model);
    }

    @Override
    public RoleEntity getCustomerRole() {
        return findByCode("CUSTOMER");
    }

}
