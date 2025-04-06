package hust.phone_selling_app.domain.order;

import java.time.Instant;
import java.util.List;

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
public class Order {

    private Long id;

    private Long userId;

    private String phone;

    private String address;

    private String receiveName;

    private String paymentMethod;

    private String receiveMethod;

    private String status;

    private Long totalPrice;

    private String note;

    private Instant createdAt;

    private Instant updatedAt;

    List<OrderItem> orderItems;

}
