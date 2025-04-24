package hust.phone_selling_app.infrastructure.utils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.UUID;
import java.util.function.Function;

import org.springframework.stereotype.Component;

import com.nimbusds.jose.JOSEException;
import com.nimbusds.jose.JWSAlgorithm;
import com.nimbusds.jose.JWSHeader;
import com.nimbusds.jose.JWSVerifier;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;

import hust.phone_selling_app.domain.exception.AppException;
import hust.phone_selling_app.domain.exception.ErrorCode;
import hust.phone_selling_app.domain.role.Role;
import hust.phone_selling_app.domain.role.RoleRepository;
import hust.phone_selling_app.domain.user.User;
import hust.phone_selling_app.infrastructure.property.JwtProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtUtils {

    private final JwtProperty jwtProperty;
    private final RoleRepository roleRepository;

    public String generateToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS256);

        JWTClaimsSet claimSet = new JWTClaimsSet.Builder()
                .subject(user.getId().toString())
                .issuer("kiencoam")
                .issueTime(new Date())
                .expirationTime(
                        new Date(Instant.now().plus(jwtProperty.getExpiration(), ChronoUnit.SECONDS).toEpochMilli()))
                .jwtID(UUID.randomUUID().toString())
                .claim("scope", buildScope(user))
                .build();

        SignedJWT signedJWT = new SignedJWT(header, claimSet);

        try {
            signedJWT.sign(new MACSigner(jwtProperty.getSecret().getBytes()));
            return signedJWT.serialize();
        } catch (JOSEException e) {
            log.error("Error signing token", e);
            throw new AppException(ErrorCode.GENERATE_TOKEN_FAILED);
        }
    }

    private String buildScope(User user) {
        Role role = roleRepository.findById(user.getRoleId());
        if (role == null) {
            throw new AppException(ErrorCode.ROLE_NOT_FOUND);
        }
        return role.getCode();
    }

    public JWTClaimsSet extractAllClaims(String token) {
        try {
            JWSVerifier verifier = new MACVerifier(jwtProperty.getSecret().getBytes());

            SignedJWT signedJWT = SignedJWT.parse(token);

            if (!signedJWT.verify(verifier)) {
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }

            return signedJWT.getJWTClaimsSet();
        } catch (JOSEException | ParseException e) {
            log.error("Error when extract claims from token, {}", e.getMessage());
            throw new RuntimeException(e);
        }
    }

    public <T> T extractClaim(String token, Function<JWTClaimsSet, T> claimsResolver) {
        JWTClaimsSet claims = extractAllClaims(token);
        return claimsResolver.apply(claims);
    }

    public Date extractExpiration(String token) {
        return extractClaim(token, JWTClaimsSet::getExpirationTime);
    }

    public Long extractUserId(String token) {
        return Long.parseLong(extractClaim(token, JWTClaimsSet::getSubject));
    }

    public String extractRole(String token) {
        return extractClaim(token, claims -> {
            try {
                return claims.getStringClaim("scope");
            } catch (ParseException e) {
                log.error("Error when extract role from token, {}", e.getMessage());
                throw new AppException(ErrorCode.INVALID_TOKEN);
            }
        });
    }

}
