package hust.phone_selling_app.core.port;

import hust.phone_selling_app.core.domain.entity.RoleEntity;

public interface IRolePort {

    RoleEntity save(RoleEntity roleEntity);

    RoleEntity findById(Long id);

    RoleEntity findByName(String name);

    RoleEntity findByCode(String code);

    RoleEntity getCustomerRole();

}
