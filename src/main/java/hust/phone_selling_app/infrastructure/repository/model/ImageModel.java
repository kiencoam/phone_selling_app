package hust.phone_selling_app.infrastructure.repository.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Data
@Document(collection = "images")
public class ImageModel {

    @Id
    private String id;

    private String base64;

    private Long variantId;

    private Boolean isPrimary;

}
