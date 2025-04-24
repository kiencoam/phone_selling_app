package hust.phone_selling_app.infrastructure.persistence;

import org.springframework.stereotype.Component;

import hust.phone_selling_app.domain.role.Role;
import hust.phone_selling_app.domain.role.RoleRepository;
import hust.phone_selling_app.infrastructure.persistence.assembler.RoleAssembler;
import hust.phone_selling_app.infrastructure.persistence.jpa.RoleRepositoryJpa;
import hust.phone_selling_app.infrastructure.persistence.model.RoleModel;
import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class RoleRepositoryImpl implements RoleRepository {

    private final RoleRepositoryJpa roleRepository;

    @Override
    public Role findById(Long id) {
        RoleModel roleModel = roleRepository.findById(id).orElse(null);
        return RoleAssembler.toDomain(roleModel);
    }

    @Override
    public Role findByCode(String code) {
        RoleModel roleModel = roleRepository.findByCode(code).orElse(null);
        return RoleAssembler.toDomain(roleModel);
    }

    @Override
    public Role save(Role role) {
        RoleModel roleModel = RoleAssembler.toModel(role);
        roleModel = roleRepository.save(roleModel);
        return RoleAssembler.toDomain(roleModel);
    }

    @Override
    public void deleteById(Long id) {
        roleRepository.deleteById(id);
    }

}
