package hust.phone_selling_app.kernel.utils;

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

import hust.phone_selling_app.core.domain.constant.ErrorCode;
import hust.phone_selling_app.core.domain.entity.UserEntity;
import hust.phone_selling_app.core.exception.AppException;
import hust.phone_selling_app.kernel.property.JwtProperty;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class JwtUtils {

    private final JwtProperty jwtProperty;

    public String generateToken(UserEntity user) {
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

    private String buildScope(UserEntity user) {
        return user.getRole().getCode();
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

}
