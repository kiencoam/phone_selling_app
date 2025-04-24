package hust.phone_selling_app.infrastructure.config;

import java.util.Date;

import javax.crypto.spec.SecretKeySpec;

import org.springframework.security.oauth2.jose.jws.MacAlgorithm;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.JwtException;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.stereotype.Component;

import hust.phone_selling_app.infrastructure.property.JwtProperty;
import hust.phone_selling_app.infrastructure.utils.JwtUtils;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomJwtDecoder implements JwtDecoder {

    private final JwtProperty jwtPropertiy;

    private final JwtUtils jwtUtils;

    private NimbusJwtDecoder nimbusJwtDecoder;

    @PostConstruct
    public void init() {
        SecretKeySpec spec = new SecretKeySpec(jwtPropertiy.getSecret().getBytes(), "HS512");
        nimbusJwtDecoder = NimbusJwtDecoder.withSecretKey(spec)
                .macAlgorithm(MacAlgorithm.HS256)
                .build();
    }

    @Override
    public Jwt decode(String token) throws JwtException {
        if (!validateToken(token)) {
            throw new JwtException("Invalid token");
        }
        return nimbusJwtDecoder.decode(token);
    }

    public Boolean validateToken(String token) {
        try {
            Date expiration = jwtUtils.extractExpiration(token);
            if (expiration.before(new Date())) {
                return false;
            }
        } catch (Exception e) {
            log.error("Error when validate tokenm, {}", e.getMessage());
            return false;
        }
        return true;
    }

}
