package hust.phone_selling_app.interfaces.order.facade.dto;

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
public class OrderDTO {

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

    List<OrderItemDTO> orderItems;

}
