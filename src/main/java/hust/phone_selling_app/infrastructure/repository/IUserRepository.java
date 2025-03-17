package hust.phone_selling_app.infrastructure.repository;

import java.util.Optional;

import org.springframework.stereotype.Repository;

import hust.phone_selling_app.infrastructure.repository.model.UserModel;

@Repository
public interface IUserRepository extends IBaseRepository<UserModel> {

    Optional<UserModel> findByEmail(String email);

    Optional<UserModel> findByFullName(String fullName);

}
