package hust.phone_selling_app.core.service;

import hust.phone_selling_app.core.domain.dto.request.CreateCustomerRequestDto;
import hust.phone_selling_app.core.domain.dto.request.CreateUserRequestDto;
import hust.phone_selling_app.core.domain.dto.request.LogInRequestDTO;
import hust.phone_selling_app.core.domain.dto.response.LogInResponseDTO;
import hust.phone_selling_app.core.domain.entity.UserEntity;

public interface IUserService {

    public UserEntity createCustomer(CreateCustomerRequestDto createCustomerRequestDto);

    public UserEntity createUser(CreateUserRequestDto createUserRequestDto);

    public LogInResponseDTO logIn(LogInRequestDTO request, String roleCode);

}
