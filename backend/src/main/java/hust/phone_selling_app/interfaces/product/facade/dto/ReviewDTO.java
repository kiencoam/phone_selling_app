package hust.phone_selling_app.interfaces.product.facade.dto;

import java.time.Instant;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class ReviewDTO {

    private Long id;

    private UserDTO user;

    private String content;

    private Integer rating;

    private Instant createdAt;

}
