package hust.phone_selling_app.infrastructure.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import hust.phone_selling_app.infrastructure.repository.model.RoleModel;

@Repository
public interface IRoleRepository extends IBaseRepository<RoleModel> {

    Optional<RoleModel> findByCode(String code);

    Optional<RoleModel> findByName(String name);

}
