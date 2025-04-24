package hust.phone_selling_app.infrastructure.persistence.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Index;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "inventories", indexes = {
        @Index(name = "idx_inventory_variant_id", columnList = "variant_id")
})
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class InventoryModel extends AuditTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "variant_id", nullable = false)
    private Long variantId;

    @Column(nullable = false)
    private Long available;

    @Column(nullable = false)
    private Long sold;

    @Version
    private Long version;

}
