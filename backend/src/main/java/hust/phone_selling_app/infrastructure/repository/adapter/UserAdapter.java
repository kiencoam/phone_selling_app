package hust.phone_selling_app.infrastructure.repository.adapter;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.port.IUserPort;
import hust.phone_selling_app.infrastructure.repository.IUserRepository;
import hust.phone_selling_app.infrastructure.repository.mapper.UserMapper;
import hust.phone_selling_app.infrastructure.repository.model.UserModel;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserAdapter implements IUserPort {

    private final IUserRepository userRepository;

    @Override
    public UserEntity save(UserEntity userEntity) {
        UserModel model = UserMapper.INSTANCE.toModel(userEntity);
        model = userRepository.save(model);
        return UserMapper.INSTANCE.toEntity(model);
    }

    @Override
    public UserEntity findByEmail(String email) {
        UserModel model = userRepository.findByEmail(email).orElse(null);
        return UserMapper.INSTANCE.toEntity(model);
    }

    @Override
    public UserEntity findById(Long id) {
        UserModel model = userRepository.findById(id).orElse(null);
        return UserMapper.INSTANCE.toEntity(model);
    }

    @Override
    public UserEntity update(UserEntity userEntity) {
        UserModel model = UserMapper.INSTANCE.toModel(userEntity);
        model = userRepository.save(model);
        return UserMapper.INSTANCE.toEntity(model);
    }

}
