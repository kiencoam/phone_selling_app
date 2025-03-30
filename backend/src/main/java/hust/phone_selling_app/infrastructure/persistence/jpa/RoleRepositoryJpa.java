package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.RoleModel;

public interface RoleRepositoryJpa extends JpaRepository<RoleModel, Long> {

    Optional<RoleModel> findByCode(String code);

}
