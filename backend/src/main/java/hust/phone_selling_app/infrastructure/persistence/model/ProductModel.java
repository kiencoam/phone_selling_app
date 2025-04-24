package hust.phone_selling_app.infrastructure.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "products")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductModel extends AuditTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String code;

    private String description;

    @Column(name = "base_price")
    private Long basePrice;

    @Column(name = "rating", nullable = false)
    private Float rating;

    @Column(name = "reviews_count", nullable = false)
    private Integer reviewsCount;

    @Column(name = "image_id")
    private String imageId;

    @Column(name = "product_line_id", nullable = false)
    private Long productLineId;

}
