package hust.phone_selling_app.infrastructure.repository.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "inventories")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class InventoryModel extends AuditTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "variant_id")
    private Long variantId;

    @Column(name = "available")
    private Long available;

    @Column(name = "sold")
    private Long sold;

    @Version
    private Long version;

}
