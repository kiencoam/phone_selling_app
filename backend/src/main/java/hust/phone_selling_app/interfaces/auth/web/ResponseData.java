package hust.phone_selling_app.interfaces.auth.web;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Builder
public class ResponseData {

    private String token;

}
