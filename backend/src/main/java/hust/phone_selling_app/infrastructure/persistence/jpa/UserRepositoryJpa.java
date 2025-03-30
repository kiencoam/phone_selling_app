package hust.phone_selling_app.infrastructure.persistence.jpa;

import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import hust.phone_selling_app.infrastructure.persistence.model.UserModel;

public interface UserRepositoryJpa extends JpaRepository<UserModel, Long> {

    Optional<UserModel> findByEmail(String email);

    Page<UserModel> findByRoleIdAndFullNameContaining(Long roleId, String fullName, Pageable pageable);

}
