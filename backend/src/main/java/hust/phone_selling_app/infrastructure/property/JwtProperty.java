package hust.phone_selling_app.infrastructure.property;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "app.security.jwt")
@Getter
@Setter
public class JwtProperty {

    private Long expiration;
    private String secret;
    private String header;
    private String prefix;

}
