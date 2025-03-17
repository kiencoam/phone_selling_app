package hust.phone_selling_app.core.service.impl;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.domain.dto.request.CreateCustomerRequestDto;
import hust.phone_selling_app.core.domain.dto.request.CreateUserRequestDto;
import hust.phone_selling_app.core.domain.dto.request.LogInRequestDTO;
import hust.phone_selling_app.core.domain.dto.response.LogInResponseDTO;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.service.IUserService;
import hust.phone_selling_app.core.usecase.CreateUserUsecase;
import hust.phone_selling_app.core.usecase.LogInUsecase;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IUserServiceImpl implements IUserService {

    private final CreateUserUsecase createUserUsecase;
    private final LogInUsecase logInUsecase;

    @Override
    public UserEntity createCustomer(CreateCustomerRequestDto request) {
        return createUserUsecase.createCustomer(request);
    }

    @Override
    public UserEntity createUser(CreateUserRequestDto request) {
        return createUserUsecase.createUser(request);
    }

    @Override
    public LogInResponseDTO logIn(LogInRequestDTO request, String roleCode) {
        return logInUsecase.logIn(request, roleCode);
    }

}
