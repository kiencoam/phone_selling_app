package hust.phone_selling_app.infrastructure.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeIn;
import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.info.Info;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.security.SecurityScheme;

@OpenAPIDefinition(info = @Info(title = "Phone Selling App API", version = "1.0", description = "API documentation for Phone Selling App"), security = @SecurityRequirement(name = "Bearer Authentication"))
@SecurityScheme(name = "Bearer Authentication", scheme = "bearer", type = SecuritySchemeType.HTTP, bearerFormat = "JWT", in = SecuritySchemeIn.HEADER, description = "Authorization header with Bearer token")
public class OpenAPIConfig {

}
