package hust.phone_selling_app.core.validation;

import org.springframework.stereotype.Service;

import hust.phone_selling_app.core.port.IUserPort;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserValidation {

    private final IUserPort userPort;

    public boolean isEmailExisted(String email) {
        return userPort.findByEmail(email) != null;
    }

}
