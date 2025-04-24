package hust.phone_selling_app.domain.image;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class Image {

    private String id;

    private String base64;

    private Boolean isPrimary;

}
