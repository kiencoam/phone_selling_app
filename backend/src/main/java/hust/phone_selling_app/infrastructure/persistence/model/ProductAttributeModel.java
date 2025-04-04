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
@Table(name = "product_attributes")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class ProductAttributeModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "attribute_id", nullable = false)
    private Long attributeId;

    private String value;

    @Column(name = "product_id", nullable = false)
    private Long productId;

}
