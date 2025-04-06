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
@Table(name = "orders")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@Builder
public class OrderModel extends AuditTable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    private String phone;

    private String address;

    @Column(name = "receive_name")
    private String receiveName;

    @Column(name = "payment_method")
    private String paymentMethod;

    @Column(name = "receive_method")
    private String receiveMethod;

    private String status;

    @Column(name = "total_price")
    private Long totalPrice;

    private String note;

}
