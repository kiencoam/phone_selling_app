package hust.phone_selling_app.core.port;

import hust.phone_selling_app.core.domain.entity.UserEntity;

public interface IUserPort {

    public UserEntity save(UserEntity userEntity);

    public UserEntity findByEmail(String email);

    public UserEntity findById(Long id);

    public UserEntity update(UserEntity userEntity);

}
