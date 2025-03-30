package hust.phone_selling_app.infrastructure.property;

import java.util.List;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Configuration
@ConfigurationProperties(prefix = "app.security.filter")
public class RequestFilter {
    private List<PublicUrl> publicUrls;
    private List<ProtectedUrl> protectedUrls;

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class PublicUrl {
        private String urlPattern;
        private String method;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Getter
    @Setter
    public static class ProtectedUrl {
        private String urlPattern;
        private List<String> roles;
    }

}
