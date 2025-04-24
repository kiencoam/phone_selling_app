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
@Table(name = "product_lines")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductLineModel extends AuditTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String code;

    @Column(name = "category_id")
    private Long categoryId;

    @Column(name = "brand_id")
    private Long brandId;

}
